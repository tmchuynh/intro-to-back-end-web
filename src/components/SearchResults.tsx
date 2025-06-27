"use client";

import { type SearchResult } from "@/utils/search";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface SearchResultsProps {
  results: SearchResult[];
  searchQuery: string;
  onResultClick: () => void;
}

export default function SearchResults({
  results,
  searchQuery,
  onResultClick,
}: SearchResultsProps) {
  if (!searchQuery.trim()) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-gray-800 shadow-lg mt-1 border rounded-md">
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No results found for &ldquo;{searchQuery}&rdquo;
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-gray-800 shadow-lg mt-1 border border-gray-200 dark:border-gray-700 rounded-md max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="mb-1 px-2 py-1 text-gray-500 text-xs dark:text-gray-400">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
          {searchQuery}&rdquo;
        </div>
        {results.map((result, index) => (
          <Link
            key={`${result.href}-${index}`}
            href={result.href}
            onClick={onResultClick}
            className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md no-underline transition-colors"
          >
            <div className="flex flex-col">
              <div className="font-medium text-gray-900 dark:text-white">
                {result.title}
              </div>
              <div className="flex items-center space-x-1 text-gray-500 text-xs dark:text-gray-400">
                <span className="text-emerald-600 dark:text-emerald-400">
                  {result.section}
                </span>
                {result.breadcrumb.length > 1 && (
                  <>
                    <FaChevronRight />
                    {result.breadcrumb.slice(0, -1).map((crumb, crumbIndex) => (
                      <React.Fragment key={crumbIndex}>
                        <span>{crumb}</span>
                        {crumbIndex <
                          result.breadcrumb.slice(0, -1).length - 1 && (
                          <FaChevronRight />
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
