"use client";

import { parseAsBoolean, useQueryState } from "nuqs";
import { useMemo } from "react";

export default function ApartmentSvgViewerThumbnail({
  onClick,
  svgCode,
  isActive,
  selectableApartments
}: {
  onClick?: () => void;
  isActive?: boolean;
  svgCode?: string | null;
  selectableApartments: Record<string, string>;
}) {
  const [showHighlights] = useQueryState(
    "showHighlights",
    parseAsBoolean.withDefault(true)
  );

  const svgContent = useMemo(() => {
    const hasWindow = typeof window !== "undefined";
    if (!hasWindow || !svgCode) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    const svgElement = doc.querySelector("svg");

    if (!svgElement) return null;

    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

    if (!svgElement.hasAttribute("viewBox")) {
      svgElement.setAttribute("viewBox", "0 0 1288 1080");
    }

    const paths = doc.querySelectorAll("path");
    paths.forEach((path) => {
      const entity = path.id;
      const baseColor = selectableApartments[entity] || "";
      const color = baseColor + "50";

      path.style.fill = "none";
      path.style.stroke = "none";

      if (showHighlights) {
        if (entity.toLowerCase().includes("z-")) {
          path.setAttribute("fill", color);
          path.style.fill = color;
          path.style.stroke = baseColor;
          path.style.strokeWidth = "1px";
          path.style.cursor = "pointer";
          path.style.pointerEvents = "all";
          path.style.transition = "fill 0.3s, stroke 0.3s";
        }
      }
    });

    return doc.documentElement.outerHTML;
  }, [svgCode, selectableApartments, showHighlights]);

  return svgContent ? (
    <div
      suppressHydrationWarning
      className={
        "svg__based__selling__ui__viewer__thumbnail" +
        (isActive ? " active" : "")
      }
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
      onClick={onClick}
    />
  ) : null;
}
