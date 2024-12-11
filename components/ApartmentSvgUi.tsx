"use client";

import "@/styles/svgBasedSellingUi.scss";
import "@/styles/svgBasedUiFilters.scss";

import { useCallback, useMemo, useState } from "react";
import mapColors from "@/data/mapColors.json";
import { IMap3dApartment } from "@/interfaces";
import ApartmentSvgViewer from "@/components/ApartmentSvgViewer";
import { useTheme } from "next-themes";
import { parseAsInteger, useQueryState } from "nuqs";
import dynamic from "next/dynamic";
import ApartmentSvgUiDetailsView360 from "./ApartmentSvgUiDetailsView360";
import ApartmentSvgUiDetailsGallery from "./ApartmentSvgUiDetailsGallery";
import ApartmentSvgUiDetailsView3d from "./ApartmentSvgUiDetailsView3d";
import { pricingMatch } from "@/constants/constants";
import ApartmentSvgUiDetailsLinkToMap from "./ApartmentSvgUiDetailsLinkToMap";
import ApartmentSvgUiDetailsAppActions from "./ApartmentSvgUiDetailsAppActions";
import ApartmentSvgUiSidebar from "./ApartmentSvgUiSidebar";

const ApartmentSvgUiDetailsActions = dynamic(
  () => import("@/components/ApartmentSvgUiDetailsActions"),
  {
    ssr: false,
    loading: () => <div className="svg__based__selling__ui__loading" />
  }
);

export default function ApartmentSvgUi({
  apartments,
  stills
}: {
  apartments: IMap3dApartment[];
  stills: { day: string | null; night: string | null }[];
}) {
  const { theme } = useTheme();
  const [appView] = useQueryState("appView", parseAsInteger.withDefault(0));
  const [property, setProperty] = useQueryState("property");
  const [selectedStill] = useQueryState(
    "selectedStill",
    parseAsInteger.withDefault(0)
  );
  const activeStill = useMemo(
    () => stills[selectedStill],
    [stills, selectedStill]
  );

  const [filters, setFilters] = useState<{
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null>({
    towers: [],
    floors: [],
    bedrooms: [],
    statuses: [],
    prices: [],
    area: []
  });

  const selectableApartments = useMemo(
    () =>
      apartments?.reduce(
        (map, { details, status }) => {
          const {
            numberOfBedrooms,
            unitPrice,
            area: aptArea,
            batch: floor = "",
            tower,
            entity
          } = details;

          if (
            (filters?.towers?.length && !filters.towers.includes(tower)) ||
            (filters?.floors?.length &&
              (!floor || !filters.floors.includes(floor))) ||
            (filters?.bedrooms?.length &&
              !filters.bedrooms.includes(`${numberOfBedrooms} bedroom`)) ||
            (filters?.statuses?.length && !filters.statuses.includes(status)) ||
            (filters?.prices?.length &&
              (unitPrice === null ||
                !pricingMatch(filters.prices, unitPrice))) ||
            (filters?.area?.length &&
              (aptArea === null ||
                parseFloat(aptArea) < filters.area[0] ||
                parseFloat(aptArea) > filters.area[1]))
          ) {
            return map;
          }

          const color =
            mapColors[status as keyof typeof mapColors] || mapColors.NO_DETAILS;

          map[entity] = color;

          return map;
        },
        {} as Record<string, string>
      ) || {},
    [apartments, filters]
  );

  const handlePropertySelection = useCallback(
    (propertyName: string) => {
      const apartment = apartments.find(
        ({ details }) => details.entity === propertyName
      );
      if (!apartment) return;
      setProperty(apartment.id);
    },
    [apartments]
  );

  const apartment = useMemo(
    () =>
      apartments.find((apartment: { id: string }) => apartment.id === property),
    [apartments, property]
  );

  const propertyDetails = useMemo(
    () => ({
      id: apartment?.id || "",
      entity: apartment?.details.entity || "",
      batch: apartment?.details.batch || null,
      area: apartment?.details.area || null,
      unitPrice: apartment?.details.unitPrice || 0,
      images: apartment?.details.images || [],
      status: apartment?.status || "NOT_SELLABLE",
      asset3dFiles: apartment?.details.asset3dFiles || [],
      link360: apartment?.details.link360 || ""
    }),
    [apartment]
  );

  return (
    <div className="svg__based__selling__ui">
      <ApartmentSvgUiSidebar
        apartments={apartments}
        filters={filters}
        setFilters={setFilters}
        stills={stills}
        selectableApartments={selectableApartments}
        handlePropertySelection={handlePropertySelection}
        propertyDetails={propertyDetails}
      />
      <div className="svg__based__selling__ui__content">
        <ApartmentSvgUiDetailsLinkToMap key={property + "link"} />
        <ApartmentSvgUiDetailsActions key={property + "actions"} />
        {property && (
          <ApartmentSvgUiDetailsAppActions
            propertyDetails={propertyDetails}
            key={property + "appActions"}
          />
        )}
        {appView === 0 && activeStill && (
          <ApartmentSvgViewer
            property={property ? apartment?.details.entity || null : null}
            svgCode={theme === "dark" ? activeStill.night : activeStill.day}
            selectableApartments={selectableApartments}
            onClick={handlePropertySelection}
          />
        )}
        {appView === 1 && propertyDetails.asset3dFiles.length > 0 && (
          <ApartmentSvgUiDetailsView3d
            assets3d={propertyDetails.asset3dFiles}
          />
        )}
        {appView === 2 && propertyDetails.link360 && (
          <ApartmentSvgUiDetailsView360 link={propertyDetails.link360} />
        )}
        {appView === 3 && propertyDetails.images.length > 0 && (
          <ApartmentSvgUiDetailsGallery images={propertyDetails.images} />
        )}
      </div>
    </div>
  );
}
