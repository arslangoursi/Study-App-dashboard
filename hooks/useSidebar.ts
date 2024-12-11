"use client";

import { sidebarCollapsedAtom } from "@/constants/state";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useAtom(sidebarCollapsedAtom);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsCollapsed(window.innerWidth < 768);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  return [isCollapsed, setIsCollapsed] as const;
}
