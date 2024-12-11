"use client";

import { mapView3d } from "@/constants/constants";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function PortalToApartmentDetails({
  children
}: {
  children: ReactNode;
}) {
  return mapView3d
    ? children
    : typeof document !== "undefined" &&
        document.querySelector(
          ".map3d__container__entry__content__right__details"
        )
      ? createPortal(
          children,
          document.querySelector(
            ".map3d__container__entry__content__right__details"
          ) as HTMLElement
        )
      : null;
}
