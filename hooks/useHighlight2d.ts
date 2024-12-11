"use client";

import { RefObject, useEffect, useState } from "react";

import { cartStatusAtom } from "@/constants/state";
import { useAtom } from "jotai";
import { useQueryState } from "nuqs";

export default function useHighlight2d(
  mapRef: RefObject<any>,
  mapGeoJson: string
) {
  const [cartOpen] = useAtom(cartStatusAtom);
  const [property, setProperty] = useQueryState("property");
  const [highlightCoordinates, setHighlightCoordinates] = useState<any>(null);

  useEffect(() => {
    if (property) return;

    setHighlightCoordinates(null);
  }, [property]);

  useEffect(() => {
    setHighlightCoordinates(null);
  }, [cartOpen]);

  useEffect(() => {
    if (!property) return;

    const timeoutId = setTimeout(() => {
      const mapInstance = mapRef.current.getMap();
      if (!mapInstance) return;

      const feature = JSON.parse(mapGeoJson).features.find((feature: any) => {
        const objectOfValue = Object.fromEntries(
          feature.properties.description.value
            .split(", ")
            .map((item: string) => item.split(": "))
        ) as Record<string, string>;

        return objectOfValue.plot_id === property;
      });

      if (!feature) return;

      const [longitude, latitude] = feature.geometry.coordinates[0][0];
      mapInstance.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true
      });
      setHighlightCoordinates(feature);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [property, mapGeoJson, mapRef]);

  const onMouseDown = (e: any) => {
    const feature = e.features?.[0];
    if (!feature) {
      setHighlightCoordinates(null);
      return;
    }

    const [longitude, latitude] = feature.geometry.coordinates[0][0];
    const objectOfValue = Object.fromEntries(
      JSON.parse(feature.properties.description)
        .value.split(", ")
        .map((item: string) => item.split(": "))
    ) as Record<string, string>;

    setHighlightCoordinates(feature);
    const zoom = Math.max(mapRef.current?.getMap()?.getZoom() ?? 0, 14.9);

    setTimeout(() => {
      setProperty(objectOfValue.plot_id);
      mapRef.current
        ?.getMap()
        ?.flyTo({ center: [longitude, latitude], zoom, essential: true });
    }, 100);
  };

  return { highlightCoordinates, onMouseDown };
}
