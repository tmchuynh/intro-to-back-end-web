import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import NavigationSection from "./NavigationSection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { navigation, loading } = useNavigation();
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [initialPathname, setInitialPathname] = useState<string | null>(null);

  // Track initial pathname and close sidebar on subsequent navigation
  useEffect(() => {
    if (initialPathname === null) {
      // First load - just set the initial pathname
      setInitialPathname(pathname);
    } else if (pathname !== initialPathname) {
      // Pathname changed after initial load - close sidebar
      onClose();
      setInitialPathname(pathname);
    }
  }, [pathname, initialPathname, onClose]);

  // Recursive function to check if any item or its children contain the path
  const checkItemContainsPath = useCallback(
    (items: NavigationItem[], path: string): boolean => {
      for (const item of items) {
        // Check direct match
        if (item.href === path) {
          return true;
        }
        // Check if path starts with this item's path (for sub-routes)
        if (path.startsWith(item.href + "/") && item.href !== "#") {
          return true;
        }
        // Recursively check children
        if (item.children && checkItemContainsPath(item.children, path)) {
          return true;
        }
      }
      return false;
    },
    []
  );

  // Function to find which section contains the current path
  const findSectionForPath = useCallback(
    (path: string) => {
      for (const section of navigation) {
        if (checkItemContainsPath(section.items, path)) {
          return section.title;
        }
      }
      return null;
    },
    [navigation, checkItemContainsPath]
  );

  // Set the section containing the current page as open by default
  useEffect(() => {
    if (navigation.length > 0 && openSection === null) {
      const currentSection = findSectionForPath(pathname);
      if (currentSection) {
        setOpenSection(currentSection);
      } else {
        // Fallback to first section if no match found
        setOpenSection(navigation[0].title);
      }
    }
  }, [navigation, openSection, findSectionForPath, pathname]);

  const handleSectionToggle = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-background bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
        bg-sidebar-bg border-border text-sidebar-text fixed top-0 left-0 z-50 w-96 h-full border-r
        transform transition-transform duration-300 ease-in-out overflow-hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center bg-primary rounded-lg h-8 w-8">
                <span className="font-bold text-lg text-white">W</span>
              </div>
              <span className="font-bold text-sidebar-text text-xl">
                Database Intro
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md sidebar-text-secondary"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Home Button */}
          <div className="pb-2 pt-4 px-4 border-border">
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 uppercase py-2 text-sidebar-text rounded-lg font-extrabold transition-colors duration-200",
                {
                  "text-sidebar-active-text": pathname === "/",
                }
              )}
            >
              Home
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-4">
              <div className="space-y-6">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="bg-sidebar-hover-bg mb-3 rounded h-4"></div>
                    <div className="space-y-2 bg-sidebar-hover-bg">
                      <div className="bg-sidebar-hover-bg rounded h-3"></div>
                      <div className="bg-sidebar-hover-bg rounded h-3"></div>
                      <div className="bg-sidebar-hover-bg rounded h-3"></div>
                    </div>
                  </div>
                ) : (
                  navigation.map((section) => (
                    <NavigationSection
                      key={section.title}
                      title={section.title}
                      items={section.items}
                      isOpen={openSection === section.title}
                      onToggle={() => handleSectionToggle(section.title)}
                    />
                  ))
                )}
              </div>
            </div>
          </nav>

          {/* Continuing The Journey */}
          <div className="pb-2 pt-4 px-4 border-border">
            <Link
              href="/continuing-the-journey"
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 uppercase py-2 text-sidebar-text font-extrabold rounded-lg transition-colors duration-200",
                {
                  "text-sidebar-active-text":
                    pathname === "/continuing-the-journey",
                }
              )}
            >
              Continuing The Journey
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
