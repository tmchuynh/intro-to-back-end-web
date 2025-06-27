import type { NavigationItem, NavigationSection } from "./navigation";

export interface SearchResult {
  title: string;
  href: string;
  section: string;
  breadcrumb: string[];
  searchableText: string;
}

// Function to flatten navigation structure for searching
export function flattenNavigationForSearch(
  sections: NavigationSection[],
): SearchResult[] {
  const results: SearchResult[] = [];

  function flattenItem(
    item: NavigationItem,
    section: string,
    breadcrumb: string[] = [],
  ): void {
    const currentBreadcrumb = [...breadcrumb, item.title];

    // Create searchable text that includes title and breadcrumb
    const searchableText = [item.title, ...currentBreadcrumb, section]
      .join(" ")
      .toLowerCase();

    // Add this item if it has a real href (not just "#")
    if (item.href && item.href !== "#") {
      results.push({
        title: item.title,
        href: item.href,
        section,
        breadcrumb: currentBreadcrumb,
        searchableText,
      });
    }

    // Recursively process children
    if (item.children) {
      item.children.forEach((child) =>
        flattenItem(child, section, currentBreadcrumb),
      );
    }
  }

  sections.forEach((section) => {
    section.items.forEach((item) => flattenItem(item, section.title));
  });

  return results;
}

// Function to search through flattened navigation
export function searchNavigation(
  flattenedNav: SearchResult[],
  query: string,
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase();
  const searchWords = searchTerm.split(/\s+/).filter((word) => word.length > 0);

  return flattenedNav
    .filter((item) => {
      // Check if all search words are found in the searchable text
      return searchWords.every((word) => item.searchableText.includes(word));
    })
    .slice(0, 10); // Limit to 10 results
}

// Function to highlight search terms in text
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  return text.replace(regex, "<mark>$1</mark>");
}
