import { fallbackNav } from "@/utils/fallback";
import {
  buildNavigationFromFileSystem,
  setExpandedState,
} from "@/utils/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentPath = searchParams.get("path");

    const navigation = await buildNavigationFromFileSystem();

    // Set expanded state based on current path if provided
    if (currentPath) {
      const expandedNavigation = setExpandedState(navigation, currentPath);
      return NextResponse.json(expandedNavigation);
    }

    return NextResponse.json(navigation);
  } catch {
    // Return fallback navigation with expanded state if path provided
    const currentPath = new URL(request.url).searchParams.get("path");
    if (currentPath) {
      const { setExpandedState } = await import("@/utils/navigation");
      const expandedFallback = setExpandedState(fallbackNav, currentPath);
      return NextResponse.json(expandedFallback);
    }
    return NextResponse.json(fallbackNav);
  }
}
