"use client";

import Map, { Layer, NavigationControl, Source } from "react-map-gl";
import { Suspense, useMemo, useRef, useState } from "react";
import {
  hoverLineStyleWithoutFill,
  imageLayerStyle,
  layerStyle,
  lineLayerStyle
} from "@/data/mapStyles2d";

import dynamic from "next/dynamic";
import useHighlight2d from "@/hooks/useHighlight2d";
import useImageBackground from "@/hooks/useImageBackground";
import useMapBounds from "@/hooks/useMapBounds";
import { IMapLand } from "@/interfaces";
import { pricingMatch } from "@/constants/constants";

const MapOverlayFilters2d = dynamic(
  () => import("@/components/MapOverlayFilters2d"),
  { ssr: false }
);

export default function LandClient({ map }: { map: IMapLand }) {
  const mapRef = useRef<any>(null);
  const backgroundImage = useImageBackground();
  const { bounds } = useMapBounds({ map, mapRef });
  const { highlightCoordinates, onMouseDown } = useHighlight2d(
    mapRef,
    map.geoJson
  );

  const [filters, setFilters] = useState<{
    blocks: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null>(null);

  const filteredJson = useMemo(() => {
    const geoJsonData = JSON.parse(map.geoJson);

    return {
      ...geoJsonData,
      features: geoJsonData.features.filter((feature: any) => {
        const { description } = feature.properties;
        if (!description) return false;

        const objectOfValue = Object.fromEntries(
          description.value.split(", ").map((item: string) => item.split(": "))
        ) as Record<string, string>;

        const { block, status, unit_price, area } = objectOfValue;

        if (filters?.blocks && filters.blocks.length > 0) {
          return filters.blocks.includes(block);
        }

        if (filters?.statuses && filters.statuses.length > 0) {
          return filters.statuses.includes(status);
        }

        if (filters?.prices && filters.prices.length > 0) {
          const priceNum = parseFloat(unit_price);
          if (!pricingMatch(filters.prices, priceNum)) {
            return false;
          }
        }

        if (filters?.area && filters.area.length === 2) {
          const areaNum = parseFloat(area);
          if (areaNum < filters.area[0] || areaNum > filters.area[1]) {
            return false;
          }
        }

        return true;
      })
    };
  }, [map.geoJson, filters]);

  return (
    <div style={{ width: "100vw", height: "100dvh", position: "relative" }}>
      <Map
        reuseMaps
        ref={mapRef}
        antialias={true}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        preserveDrawingBuffer={true}
        onMouseDown={onMouseDown}
        interactiveLayerIds={["data"]}
        style={{ width: "100vw", height: "100dvh", border: "none" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_TOKEN}
      >
        {map && bounds && (
          <>
            <Source
              id="radar"
              type="image"
              url={backgroundImage || ""}
              coordinates={bounds}
            >
              <Layer {...imageLayerStyle} />
            </Source>
            <Source type="geojson" data={filteredJson}>
              <Layer {...layerStyle} />
              <Layer {...lineLayerStyle} />
            </Source>
            {highlightCoordinates && (
              <Source type="geojson" data={highlightCoordinates}>
                <Layer {...hoverLineStyleWithoutFill} />
              </Source>
            )}
          </>
        )}
        <NavigationControl />
      </Map>
      <div className="map__overlay__logo">
        <img loading="lazy" src="/logo.webp" alt="zood logo" />
      </div>
      <Suspense fallback={null}>
        <MapOverlayFilters2d
          lands={map.lands}
          filters={filters}
          setFilters={setFilters}
        />
      </Suspense>
    </div>
  );
}
