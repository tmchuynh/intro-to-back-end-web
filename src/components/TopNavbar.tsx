"use client";

import { useNavigation } from "@/hooks/useNavigation";
import {
  flattenNavigationForSearch,
  searchNavigation,
  type SearchResult,
} from "@/utils/search";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import SearchResults from "./SearchResults";

interface TopNavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function TopNavbar({
  onToggleSidebar,
  sidebarOpen,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { navigation } = useNavigation();

  // Ensure component is mounted before showing theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Flatten navigation for search
  const flattenedNavigation = useMemo(() => {
    return flattenNavigationForSearch(navigation);
  }, [navigation]);

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchNavigation(flattenedNavigation, searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, flattenedNavigation]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border-b border-border h-16 w-full -900">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center">
          {/* Mobile toggle button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop toggle button */}
          <button
            onClick={onToggleSidebar}
            className="lg:flex hidden hover:bg-gray-100 dark:hover:bg-gray-800 -ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition-colors"
            aria-label="Toggle sidebar"
            title={`${sidebarOpen ? "Hide" : "Show"} sidebar (Ctrl+B)`}
          >
            {sidebarOpen ? (
              // Hide sidebar icon (sidebar with arrow pointing left)
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            ) : (
              // Show sidebar icon (sidebar with arrow pointing right)
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          {/* Mobile logo - only visible when sidebar is closed */}
          <div className="lg:hidden ml-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center bg-primary rounded-md h-6 w-6">
                <span className="font-bold text-sm text-white">W</span>
              </div>
              <span className="font-bold text-lg">Web Intro</span>
            </div>
          </div>

          {/* Desktop logo - visible when sidebar is hidden */}
          {!sidebarOpen && (
            <div className="lg:flex hidden ml-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center bg-primary rounded-lg h-8 w-8">
                  <span className="font-bold text-lg text-white">W</span>
                </div>
                <span className="font-bold text-sidebar-text text-xl">
                  Web Intro
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center - Search bar */}
        <div className="flex-1 mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search topics, categories, and pages..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="block bg-gray-50 dark:bg-gray-800 pl-10 pr-12 py-2 border border-gray-200 dark:border-gray-700 focus:border-transparent focus:ring-2 focus:ring-emerald-500 rounded-md min-w-[20em] w-full text-gray-900 text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />

            {/* Search Results Dropdown */}
            {showResults && (
              <SearchResults
                results={searchResults}
                searchQuery={searchQuery}
                onResultClick={handleSearchResultClick}
              />
            )}
          </div>
        </div>

        {/* Right side - Theme toggle */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition-colors"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              // Placeholder icon while theme is loading
              <div className="h-5 w-5" />
            ) : theme === "dark" ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
