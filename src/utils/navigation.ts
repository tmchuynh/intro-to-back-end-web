import fs from "fs";
import path from "path";
import { fallbackNav } from "./fallback";

export interface NavigationItem {
  title: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
  order?: number;
  isExpanded?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Category prefixes that should be stripped from display titles
const CATEGORY_PREFIXES = [
  "sql",
  "nosql",
  "fund", // fundamentals
  "adv", // advanced
  "util", // utilities
  "db", // database
  "api",
  "sec", // security
  "perf", // performance
  "dep", // deployment
  "proj", // projects
];

// Extract category from filename prefix and return both category and clean name
export function extractCategoryFromPath(pathName: string): {
  category: string | null;
  cleanName: string;
} {
  const parts = pathName.split("-");

  if (parts.length > 1) {
    const firstPart = parts[0].toLowerCase();

    // Check if first part matches a category prefix
    if (CATEGORY_PREFIXES.includes(firstPart)) {
      const cleanName = parts.slice(1).join("-"); // Remove the first part (prefix)
      return {
        category: firstPart,
        cleanName: cleanName,
      };
    }
  }

  return {
    category: null,
    cleanName: pathName,
  };
}

export function toSmartTitleCase(str: string): string {
  // Extract category and clean name first
  const { cleanName } = extractCategoryFromPath(str);

  // Define words to be lowercased (articles, conjunctions, short prepositions)
  const minorWords = new Set([
    "a",
    "an",
    "and",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "as",
    "at",
    "by",
    "with",
    "for",
    "in",
    "of",
    "on",
    "per",
    "to",
    "via",
    "vs",
    "v",
    "vs.",
    "v.",
  ]);

  if (cleanName.startsWith("use") && !cleanName.startsWith("user")) {
    return cleanName;
  }

  if (cleanName === "jQuery") {
    return "jQuery"; // Keep jQuery as is
  }

  return cleanName
    .split("-")
    .map((word, index, array) => {
      // Always capitalize the first word of the title
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      // Always capitalize the last word of the title
      if (index === array.length - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      // Handle hyphenated words (capitalize both parts)
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("-");
      }

      // Lowercase minor words unless they are the first or last word
      if (minorWords.has(word)) {
        return word;
      }

      // Capitalize the first letter of other words
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Function to read metadata from MDX files
export async function readMDXMetadata(
  filePath: string
): Promise<{ title?: string; order?: number }> {
  try {
    if (typeof window !== "undefined") {
      // Client-side: return empty metadata
      return {};
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const metadata: { title?: string; order?: number } = {};

    // Extract frontmatter (if any)
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*["'](.+)["']/);
      const orderMatch = frontmatter.match(/order:\s*(\d+)/);

      if (titleMatch) metadata.title = titleMatch[1];
      if (orderMatch) metadata.order = parseInt(orderMatch[1]);
    }

    // Note: Removed H1 fallback - will now rely on pathname formatting instead
    // This makes the sidebar use pathname-based titles rather than H1 content

    return metadata;
  } catch {
    return {};
  }
}

// Function to categorize pages into logical sections
function categorizeNavigationItems(
  items: NavigationItem[]
): NavigationSection[] {
  const categories = {
    fundamentals: [] as NavigationItem[],
    sql: [] as NavigationItem[],
    nosql: [] as NavigationItem[],
    databases: [] as NavigationItem[],
    projects: [] as NavigationItem[],
    utilities: [] as NavigationItem[],
    advanced: [] as NavigationItem[],
  };

  // Helper function to categorize an item and its children recursively
  function categorizeItem(item: NavigationItem): string {
    const path = item.href.toLowerCase();
    const title = item.title.toLowerCase();

    // Extract category from path segments
    const pathSegments = path
      .split("/")
      .filter((segment) => segment.length > 0);

    for (const segment of pathSegments) {
      const { category } = extractCategoryFromPath(segment);

      if (category) {
        // Map category prefixes to section names
        switch (category) {
          case "sql":
            return "sql";
          case "nosql":
            return "nosql";
          case "db":
            return "databases";
          case "api":
            return "databases";
          case "fund":
            return "fundamentals";
          case "proj":
            return "projects";
          case "adv":
            return "advanced";
          case "sec":
            return "advanced";
          case "perf":
            return "advanced";
          case "dep":
            return "advanced";
          case "util":
            return "utilities";
        }
      }
    }

    // If item has children, check if it's a top-level section that should be categorized as a whole
    if (item.children && item.children.length > 0) {
      // Check for other framework/library sections
      if (
        path.includes("docker") ||
        path.includes("kubernetes") ||
        path.includes("deployment-strategies") ||
        title.includes("docker") ||
        title.includes("kubernetes") ||
        title.includes("deployment")
      ) {
        return "advanced";
      }

      // Check for SQL database sections
      if (
        path.includes("mysql") ||
        path.includes("postgresql") ||
        path.includes("sqlite") ||
        path.includes("sql") ||
        title.includes("mysql") ||
        title.includes("postgresql") ||
        title.includes("sqlite") ||
        title.includes("sql")
      ) {
        return "sql";
      }

      // Check for NoSQL database sections
      if (
        path.includes("mongodb") ||
        path.includes("redis") ||
        path.includes("nosql") ||
        path.includes("cassandra") ||
        path.includes("dynamodb") ||
        title.includes("mongodb") ||
        title.includes("redis") ||
        title.includes("nosql") ||
        title.includes("cassandra") ||
        title.includes("dynamodb")
      ) {
        return "nosql";
      }

      // Check for core technology sections
      if (
        path.includes("database") ||
        path.includes("environment-setup") ||
        path.includes("managers") ||
        path.includes("version") ||
        path.includes("transaction-models") ||
        path.includes("data") ||
        path.includes("graphql") ||
        title.includes("database") ||
        title.includes("databases") ||
        title.includes("managers") ||
        title.includes("environment") ||
        title.includes("version") ||
        title.includes("transaction") ||
        title.includes("data") ||
        title.includes("graphql")
      ) {
        return "databases";
      }

      // Note: Advanced project sections removed - will be categorized elsewhere
    }

    // For individual pages or items without children, use original logic
    if (
      path.includes("package-managers") ||
      path.includes("version-control") ||
      path.includes("foundation") ||
      (path.includes("setup") && !path.includes("environment-setup")) ||
      path.includes("back-end") ||
      path.includes("vocabulary") ||
      path.includes("abbreviations")
    ) {
      return "fundamentals";
    } else if (
      path.includes("mysql") ||
      path.includes("postgresql") ||
      path.includes("sqlite") ||
      path.includes("sql") ||
      title.includes("mysql") ||
      title.includes("postgresql") ||
      title.includes("sqlite") ||
      title.includes("sql")
    ) {
      return "sql";
    } else if (
      path.includes("mongodb") ||
      path.includes("redis") ||
      path.includes("nosql") ||
      path.includes("cassandra") ||
      path.includes("dynamodb") ||
      title.includes("mongodb") ||
      title.includes("redis") ||
      title.includes("nosql") ||
      title.includes("cassandra") ||
      title.includes("dynamodb")
    ) {
      return "nosql";
    } else if (
      path.includes("docker") ||
      path.includes("kubernetes") ||
      path.includes("advanced") ||
      path.includes("principles") ||
      path.includes("quality-security-performance") ||
      path.includes("deployment-strategies") ||
      title.includes("docker") ||
      title.includes("principles") ||
      title.includes("advanced") ||
      title.includes("security") ||
      title.includes("kubernetes") ||
      title.includes("deployment")
    ) {
      return "advanced";
    } else if (
      path.includes("seo-accessibility") ||
      path.includes("introduction-to-html") ||
      path.includes("environment-setup") ||
      path.includes("introduction-to-javascript") ||
      path.includes("document-object-model") ||
      path.includes("forms") ||
      path.includes("jquery") ||
      path.includes("documentation-and-learning-platforms") ||
      title.includes("html") ||
      title.includes("css") ||
      title.includes("javascript") ||
      title.includes("seo") ||
      title.includes("environment") ||
      title.includes("dom") ||
      title.includes("forms") ||
      title.includes("jquery") ||
      title.includes("documentation") ||
      title.includes("learning platforms")
    ) {
      return "databases";
    } else if (
      path.includes("utilities-tools") ||
      path.includes("resources-utilities") ||
      path.includes("helper-functions") ||
      path.includes("development-tools") ||
      path.includes("utility-libraries") ||
      title.includes("utilities") ||
      title.includes("utility") ||
      title.includes("helper") ||
      title.includes("tools") ||
      title.includes("platforms")
    ) {
      return "utilities";
    } else {
      return "fundamentals";
    }
  }

  items.forEach((item) => {
    const category = categorizeItem(item);
    categories[category as keyof typeof categories].push(item);
  });

  // Create sections only if they have items
  const sections: NavigationSection[] = [];

  if (categories.fundamentals.length > 0) {
    sections.push({
      title: "Fundamentals",
      items: categories.fundamentals,
    });
  }

  if (categories.sql.length > 0) {
    sections.push({
      title: "SQL",
      items: categories.sql,
    });
  }

  if (categories.nosql.length > 0) {
    sections.push({
      title: "NoSQL",
      items: categories.nosql,
    });
  }

  if (categories.databases.length > 0) {
    sections.push({
      title: "Databases",
      items: categories.databases,
    });
  }

  if (categories.projects.length > 0) {
    sections.push({
      title: "Projects",
      items: categories.projects,
    });
  }

  if (categories.utilities.length > 0) {
    sections.push({
      title: "Utilities & Tools",
      items: categories.utilities,
    });
  }

  if (categories.advanced.length > 0) {
    sections.push({
      title: "Advanced Topics",
      items: categories.advanced,
    });
  }

  return sections;
}

// Function to scan the app directory and build navigation structure
export async function buildNavigationFromFileSystem(): Promise<
  NavigationSection[]
> {
  if (typeof window !== "undefined") {
    // Client-side fallback navigation
    return fallbackNav;
  }

  try {
    const appDir = path.join(process.cwd(), "src/app");
    const navigationItems = await scanDirectory(appDir, "");

    // Categorize items into logical sections
    const sections = categorizeNavigationItems(navigationItems);

    return sections;
  } catch {
    return fallbackNav; // Return fallback navigation on error
  }
}

// Helper function to determine priority for sorting navigation items
function getPriority(title: string): number {
  const normalizedTitle = title.toLowerCase();
  if (
    normalizedTitle.includes("abbreviations") ||
    normalizedTitle.includes("vocabulary") ||
    normalizedTitle.includes("acronyms")
  )
    return 1;

  if (
    normalizedTitle.includes("setting up") ||
    normalizedTitle.includes("set up") ||
    normalizedTitle.includes("selection") ||
    normalizedTitle.includes("starter") ||
    normalizedTitle.includes("fundamentals") ||
    normalizedTitle.includes("setup")
  )
    return 2;

  if (
    normalizedTitle.includes("getting started") ||
    normalizedTitle.includes("project structure")
  )
    return 3;

  if (
    normalizedTitle.includes("introduction") ||
    normalizedTitle.includes("foundation") ||
    normalizedTitle.includes("intro")
  )
    return 4;

  if (
    normalizedTitle.includes("security") ||
    normalizedTitle.includes("performance")
  )
    return 999;
  if (
    normalizedTitle.includes("bonus") ||
    normalizedTitle.includes("libraries") ||
    normalizedTitle.includes("optional") ||
    normalizedTitle.includes("frameworks")
  )
    return 9999; // Always at the bottom
  return 99; // Default priority for other items
}

// Helper function to sort navigation items with priority logic
function sortNavigationItems(items: NavigationItem[]): NavigationItem[] {
  return items.sort((a, b) => {
    const priorityA = getPriority(a.title);
    const priorityB = getPriority(b.title);

    // If both have priorities, sort by priority (lower number = higher priority)
    if (priorityA !== 999 || priorityB !== 999) {
      return priorityA - priorityB;
    }

    // Both items have default priority (999), use existing logic
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}

async function scanDirectory(
  dirPath: string,
  basePath: string
): Promise<NavigationItem[]> {
  const items: NavigationItem[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (
        entry.name.startsWith(".") ||
        entry.name === "globals.css" ||
        entry.name === "favicon.ico" ||
        entry.name === "layout.tsx"
      ) {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const routePath = basePath + "/" + entry.name;

      if (entry.isDirectory()) {
        // Check if directory has a page file
        const pageFiles = ["page.tsx", "page.mdx", "page.js"];
        const hasPage = pageFiles.some((file) =>
          fs.existsSync(path.join(fullPath, file))
        );

        if (hasPage) {
          // Directory with a page file
          const pageFile = pageFiles.find((file) =>
            fs.existsSync(path.join(fullPath, file))
          );
          const pagePath = path.join(fullPath, pageFile!);
          const metadata = await readMDXMetadata(pagePath);

          const item: NavigationItem = {
            title: metadata.title || toSmartTitleCase(entry.name),
            href: routePath === "/page" ? "/" : routePath,
            order: metadata.order,
          };

          // Check for children
          const children = await scanDirectory(fullPath, routePath);
          if (children.length > 0) {
            item.children = sortNavigationItems(children);
          }

          items.push(item);
        } else {
          // Directory without page file, scan for children
          const children = await scanDirectory(fullPath, routePath);
          if (children.length > 0) {
            items.push({
              title: toSmartTitleCase(entry.name),
              href: routePath, // Use the actual route path instead of "#" for categorization
              children: sortNavigationItems(children),
            });
          }
        }
      } else if (entry.name === "page.mdx" || entry.name === "page.tsx") {
        // Skip individual page files as they're handled by directory scanning
        continue;
      }
    }

    // Sort items using the helper function
    const sortedItems = sortNavigationItems(items);

    return sortedItems;
  } catch (error) {
    console.error("Error scanning directory:", dirPath, error);
    return [];
  }
}

// Function to set expanded state based on current URL
export function setExpandedState(
  sections: NavigationSection[],
  currentPath: string
): NavigationSection[] {
  const normalizedPath = currentPath.startsWith("/")
    ? currentPath
    : `/${currentPath}`;

  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) =>
      setItemExpandedState(item, normalizedPath)
    ),
  }));
}

function setItemExpandedState(
  item: NavigationItem,
  currentPath: string
): NavigationItem {
  const shouldExpand = isPathInSubtree(currentPath, item);

  return {
    ...item,
    isExpanded: shouldExpand,
    children: item.children?.map((child) =>
      setItemExpandedState(child, currentPath)
    ),
  };
}

function isPathInSubtree(currentPath: string, item: NavigationItem): boolean {
  // Check if current path matches this item exactly
  if (currentPath === item.href) {
    return true;
  }

  // Check if current path is a child of this item
  if (currentPath.startsWith(item.href + "/")) {
    return true;
  }

  // Check if any children match
  if (item.children) {
    return item.children.some((child) => isPathInSubtree(currentPath, child));
  }

  return false;
}

// Function to get client-side navigation with expanded state
export function getClientSideNavigation(
  currentPath?: string
): NavigationSection[] {
  if (currentPath) {
    return setExpandedState(fallbackNav, currentPath);
  }
  return fallbackNav;
}
