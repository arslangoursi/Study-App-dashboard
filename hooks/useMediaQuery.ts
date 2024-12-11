"use client";

import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return undefined;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches !== matches) {
        setMatches(e.matches);
      }
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query, matches]);

  return matches;
};

export default useMediaQuery;
