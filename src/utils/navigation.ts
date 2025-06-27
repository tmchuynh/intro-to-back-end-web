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

export function toSmartTitleCase(str: string): string {
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

  if (str.startsWith("use") && !str.startsWith("user")) {
    return str;
  }

  if (str === "jQuery") {
    return "jQuery"; // Keep jQuery as is
  }

  return str
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
    developer_tools: [] as NavigationItem[],
    databases: [] as NavigationItem[],
    utilities: [] as NavigationItem[],
    advanced: [] as NavigationItem[],
    advanced_projects: [] as NavigationItem[],
  };

  // Helper function to categorize an item and its children recursively
  function categorizeItem(item: NavigationItem): string {
    const path = item.href.toLowerCase();
    const title = item.title.toLowerCase();

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

      // Check for core technology sections
      if (
        path.includes("database") ||
        path.includes("database") ||
        path.includes("transaction-models") ||
        path.includes("data") ||
        path.includes("mysql") ||
        path.includes("redis") ||
        path.includes("graphql") ||
        path.includes("mongodb") ||
        title.includes("database") ||
        title.includes("databases") ||
        title.includes("transaction") ||
        title.includes("data") ||
        title.includes("mysql") ||
        title.includes("graphql") ||
        title.includes("mongodb") ||
        title.includes("redis")
      ) {
        return "databases";
      }

      // Check for developer tools sections
      if (
        path.includes("developer-tools") ||
        title.includes("developer tools")
      ) {
        return "developer_tools";
      }

      // Check for advanced project sections
      if (
        path.includes("advancing") ||
        path.includes("blog-website") ||
        path.includes("ecommerce-platform") ||
        title.includes("blog") ||
        title.includes("ecommerce") ||
        title.includes("advancing") ||
        path.includes("project") ||
        path.includes("website-portfolio") ||
        title.includes("project") ||
        title.includes("portfolio")
      ) {
        return "advanced_projects";
      }
    }

    // For individual pages or items without children, use original logic
    if (
      path.includes("package-managers") ||
      path.includes("version-control") ||
      path.includes("foundation") ||
      path.includes("setup") ||
      path.includes("back-end") ||
      path.includes("vocabulary") ||
      path.includes("abbreviations")
    ) {
      return "fundamentals";
    } else if (
      path.includes("docker") ||
      path.includes("kubernetes") ||
      path.includes("principles") ||
      path.includes("quality-security-performance") ||
      path.includes("deployment-strategies") ||
      title.includes("docker") ||
      title.includes("principles") ||
      title.includes("security") ||
      title.includes("kubernetes") ||
      title.includes("deployment")
    ) {
      return "advanced";
    } else if (
      path.includes("browser-developer-tools") ||
      path.includes("command-line-interface") ||
      path.includes("tools-and-resources-overview") ||
      path.includes("development-environment") ||
      path.includes("git-and-github") ||
      path.includes("hosting-and-deployment") ||
      path.includes("package-managers") ||
      title.includes("development environment") ||
      title.includes("developer tools")
    ) {
      return "developer_tools";
    } else if (
      path.includes("advancing") ||
      path.includes("blog-website") ||
      path.includes("ecommerce-platform") ||
      title.includes("blog") ||
      title.includes("ecommerce") ||
      title.includes("advancing") ||
      path.includes("project") ||
      path.includes("website-portfolio") ||
      title.includes("project") ||
      title.includes("portfolio")
    ) {
      return "advanced_projects";
    } else if (
      path.includes("seo-accessibility") ||
      path.includes("introduction-to-html") ||
      path.includes("introduction-to-css") ||
      path.includes("introduction-to-javascript") ||
      path.includes("document-object-model") ||
      path.includes("forms") ||
      path.includes("jquery") ||
      path.includes("documentation-and-learning-platforms") ||
      title.includes("html") ||
      title.includes("css") ||
      title.includes("javascript") ||
      title.includes("seo") ||
      title.includes("accessibility") ||
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

  if (categories.developer_tools.length > 0) {
    sections.push({
      title: "Developer Tools & Resources",
      items: categories.developer_tools,
    });
  }

  if (categories.databases.length > 0) {
    sections.push({
      title: "Databases",
      items: categories.databases,
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

  if (categories.advanced_projects.length > 0) {
    sections.push({
      title: "Projects",
      items: categories.advanced_projects,
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
  if (normalizedTitle.includes("overview")) return 1;
  if (
    normalizedTitle.includes("setting up") ||
    normalizedTitle.includes("set up") ||
    normalizedTitle.includes("getting started") ||
    normalizedTitle.includes("main") ||
    normalizedTitle.includes("setup")
  )
    return 2;
  if (
    normalizedTitle.includes("introduction") ||
    normalizedTitle.includes("project structure") ||
    normalizedTitle.includes("intro")
  )
    return 3;
  if (normalizedTitle.includes("home")) return 4;

  if (
    normalizedTitle.includes("fundamentals") ||
    normalizedTitle.includes("layouts")
  )
    return 5;
  if (normalizedTitle.includes("vocabulary")) return 6;
  if (
    normalizedTitle.includes("security") ||
    normalizedTitle.includes("performance")
  )
    return 999;
  if (
    normalizedTitle.includes("bonus") ||
    normalizedTitle.includes("libraries") ||
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
              href: "#",
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
