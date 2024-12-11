"use client";

import { useEffect } from "react";

export default function useHideScrollBar(dependencies: any[] = []) {
  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    if (!hasWindow) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, dependencies);
}
