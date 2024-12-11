"use client";

import { cartAtom } from "@/constants/state";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useMemo } from "react";

export default function ApartmentSvgViewer({
  svgCode,
  onClick,
  property,
  selectableApartments
}: {
  property: string | null;
  svgCode?: string | null;
  onClick?: (event: string) => void;
  selectableApartments: Record<string, string>;
}) {
  const [cart] = useAtom(cartAtom);
  const [showHighlights] = useQueryState(
    "showHighlights",
    parseAsBoolean.withDefault(true)
  );
  const { projectNumber, mapNumber } = useParams();

  const mapCart = useMemo(() => {
    const projectCart = cart.find(
      (item) =>
        item.projectNumber === projectNumber && item.mapNumber === mapNumber
    );
    return projectCart ? projectCart.property : [];
  }, [cart, projectNumber, mapNumber]);

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
          if (entity.toLowerCase() === property?.toLowerCase()) {
            path.classList.add("selected");
            path.setAttribute("fill", baseColor);
            path.style.fill = baseColor;
            path.style.stroke = baseColor;
          }
          if (
            mapCart.some(
              (item) => item.entity.toLowerCase() === entity.toLowerCase()
            )
          ) {
            path.classList.add("selected");
            path.setAttribute("fill", "#ffffff");
            path.style.fill = "#ffffff";
            path.style.stroke = "#ffffff";
          }
        }
      }
    });

    return doc.documentElement.outerHTML;
  }, [svgCode, selectableApartments, property, showHighlights, mapCart]);

  return (
    <div
      className="svg__based__selling__ui__viewer"
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
      suppressHydrationWarning
      onClick={(event) => {
        const target = event.target as SVGPathElement;

        if (target.tagName === "path" && target.id) {
          const entity = target.id;

          if (selectableApartments[entity]) {
            onClick?.(entity);

            const paths = document.querySelectorAll("path");
            paths.forEach((path) => {
              const isSelectable = selectableApartments[path.id];
              const isInCart = mapCart.some(
                (item) => item.entity.toLowerCase() === path.id.toLowerCase()
              );
              if (isSelectable && !isInCart) {
                path.classList.remove("selected");
                path.style.fill = (selectableApartments[path.id] || "") + "50";
              } else if (!isSelectable) {
                path.style.fill = "none";
              }
            });

            const isInCart = mapCart.some(
              (item) => item.entity.toLowerCase() === entity.toLowerCase()
            );

            if (!isInCart) {
              target.classList.toggle("selected");
              target.style.fill = selectableApartments[entity] || "";
            }
          }
        }
      }}
      onMouseOver={(event) => {
        const target = event.target as SVGPathElement;
        if (target.tagName === "path" && target.id) {
          if (selectableApartments[target.id]) {
            target.style.fill = selectableApartments[target.id] || "";
          }
        }
      }}
      onMouseOut={(event) => {
        const target = event.target as SVGPathElement;
        if (target.tagName === "path" && target.id) {
          if (!target.classList.contains("selected")) {
            if (selectableApartments[target.id]) {
              target.style.fill =
                (selectableApartments[target.id] || "") + "50";
            } else {
              target.style.fill = "none";
            }
          }
        }
      }}
    />
  );
}
