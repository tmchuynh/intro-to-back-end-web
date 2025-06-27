"use client";

import type { NavigationSection } from "@/utils/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationSection[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function loadNavigation() {
      try {
        // In client-side, we'll fetch from an API route with current path
        const response = await fetch(
          `/api/navigation?path=${encodeURIComponent(pathname)}`
        );
        if (response.ok) {
          const data = await response.json();
          setNavigation(data);
        } else {
          // Fallback to empty navigation if API fails
          setNavigation([]);
        }
      } catch {
        // Fallback to empty navigation if fetch fails
        setNavigation([]);
      } finally {
        setLoading(false);
      }
    }

    loadNavigation();
  }, [pathname]);

  return { navigation, loading };
}
