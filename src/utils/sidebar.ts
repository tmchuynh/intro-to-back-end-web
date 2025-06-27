// Utility functions for sidebar state management

export const SIDEBAR_STORAGE_KEY = "sidebar-open";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

/**
 * Load sidebar state from localStorage
 * @param defaultValue - Default state if no saved value exists
 * @returns boolean indicating if sidebar should be open
 */
export function loadSidebarState(defaultValue: boolean = true): boolean {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Save sidebar state to localStorage
 * @param isOpen - Current sidebar state
 */
export function saveSidebarState(isOpen: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isOpen));
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Get the sidebar width in pixels based on the current breakpoint
 * @returns sidebar width for margin calculations
 */
export function getSidebarWidth(): string {
  return "24rem"; // 384px (w-96)
}
