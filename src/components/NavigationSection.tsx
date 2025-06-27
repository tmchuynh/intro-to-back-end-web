import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavigationSectionProps {
  title: string;
  items: NavigationItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavigationSection({
  title,
  items,
  isOpen,
  onToggle,
}: NavigationSectionProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Reset expanded item when section is closed
  useEffect(() => {
    if (!isOpen) {
      setExpandedItem(null);
    }
  }, [isOpen]);

  const handleItemToggle = (itemTitle: string) => {
    setExpandedItem(expandedItem === itemTitle ? null : itemTitle);
  };

  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex justify-between items-center mb-3 w-full font-extrabold text-left text-md uppercase tracking-wider transition-colors ${
          isOpen
            ? "text-sidebar-active-text"
            : "text-sidebar-text hover:text-sidebar-active-text"
        }`}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out scrollbar-hide ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className={`space-y-1 ${isOpen ? "pb-2" : ""}`}>
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            return (
              <NavigationItem
                key={`${item.href}-${item.title}-${index}`}
                item={item}
                {...(hasChildren && {
                  isExpanded: expandedItem === item.title,
                  onToggle: () => handleItemToggle(item.title),
                })}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function NavigationItem({
  item,
  isExpanded,
  onToggle,
  depth = 0,
}: {
  item: NavigationItem;
  isExpanded?: boolean;
  onToggle?: () => void;
  depth?: number;
}) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

  // Check if current item or any of its children is active
  const isActiveItem = pathname === item.href;
  const hasActiveChild =
    hasChildren &&
    item.children!.some(
      (child) =>
        pathname === child.href ||
        (child.children &&
          child.children.some((grandchild) => pathname === grandchild.href)),
    );

  // Reset expanded child when this item is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setExpandedChild(null);
    }
  }, [isExpanded]);

  const handleChildToggle = (childTitle: string) => {
    setExpandedChild(expandedChild === childTitle ? null : childTitle);
  };

  if (hasChildren) {
    return (
      <li className="">
        <button
          onClick={onToggle}
          className={cn("", {
            "flex justify-between items-center px-3 py-2 ml-1 max-w-full hover:bg-sidebar-hover-bg hover:text-nav-text-hover w-[95%] font-medium text-left text-sm transition-colors rounded-md": true,
            "active:bg-sidebar-active-bg":
              hasActiveChild || isActiveItem || isExpanded,
            "text-foreground": depth >= 0,
            "text-white bg-sidebar-active-bg": depth >= 0 && isExpanded,
          })}
        >
          {item.title}
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out max-w-full w-[94%] scrollbar-hide ${
            isExpanded ? "max-h-screen opacity-100 ml-5" : "max-h-0 opacity-0 "
          }`}
        >
          <ul
            className={`space-y-1 mt-1  border-gray-200 dark:border-gray-700 ${
              isExpanded ? "pb-2" : ""
            } ${depth === 0 ? "border-l" : ""} ${depth > 0 ? "max-w-full w-[98%]" : ""}`}
          >
            {item.children!.map((child, childIndex) => {
              const childHasChildren =
                child.children && child.children.length > 0;
              return (
                <NavigationItem
                  key={`${child.href}-${child.title}-${childIndex}`}
                  item={child}
                  depth={depth + 1}
                  {...(childHasChildren && {
                    isExpanded: expandedChild === child.title,
                    onToggle: () => handleChildToggle(child.title),
                  })}
                />
              );
            })}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "block hover:bg-nav-item-hover active:bg-nav-item-active ml-1 px-3 py-2 rounded-md max-w-full w-[95%] text-sm hover:text-nav-text-hover transition-colors",
          {
            "bg-nav-item-active": isActiveItem,
          },
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}
