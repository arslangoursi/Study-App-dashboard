"use client";

import useLanguage from "@/hooks/useLanguage";
import Image from "next/image";
import { views } from "./ApartmentModelClient";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";

export default function MapOverlayViewButton() {
  const [lang] = useLanguage();
  const searchParams = useSearchParams();
  const selectedView = searchParams.get("mapView") || views.Satellite;
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setIsTransitioning(true);

        const params = new URLSearchParams(searchParams.toString());
        const newView =
          selectedView === views.Satellite ? views.Street : views.Satellite;
        params.set("mapView", newView);

        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`
        );
        window.location.reload();
      }}
      className="map__overlay__view__button"
    >
      <div className="map__overlay__view__button__content">
        <Image
          height={100}
          width={100}
          src={
            selectedView === views.Satellite
              ? "/map__satelite.webp"
              : "/map__street.webp"
          }
          quality={100}
          alt="map view button"
        />
        <div className="map__overlay__view__button__content__overlay">
          {isTransitioning ? (
            <Loader small />
          ) : (
            <div className="map__overlay__view__button__content__text">
              {selectedView === views.Satellite
                ? lang === "ar"
                  ? "عرض القمر الصناعي"
                  : "Satellite View"
                : lang === "ar"
                  ? "عرض الشارع"
                  : "Street View"}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
