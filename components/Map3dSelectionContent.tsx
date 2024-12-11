"use client";

import { useEffect, useState, useTransition } from "react";

import Filters from "./Map3dSelectionFilters";
import Floor from "@/components/Floors";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import useLanguage from "@/hooks/useLanguage";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IMap3dApartment } from "@/interfaces";
import { useQueryState } from "nuqs";
import { pricingMatch } from "@/constants/constants";

export default function Map3dSelectionContent({
  index,
  floorList,
  apartments
}: {
  index: number;
  floorList: { name: string; apartments: IMap3dApartment[] }[];
  apartments: IMap3dApartment[];
}) {
  const [lang] = useLanguage();
  const [, setTower] = useQueryState("tower");
  const [property, setProperty] = useQueryState("property");
  const [showFilters, setShowFilters] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<{
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null>(null);

  const { floors, bedrooms, statuses, prices, area } = filters || {};

  const filteredFloorList = floorList
    .map((floor) => {
      const filteredApartments = floor.apartments.filter((apartment) => {
        const {
          numberOfBedrooms,
          unitPrice,
          area: aptArea
        } = apartment.details;

        const meetsCriteria = [
          !floors?.length || floors.includes(floor.name),
          !bedrooms?.length || bedrooms.includes(`${numberOfBedrooms} bedroom`),
          !statuses?.length || statuses.includes(apartment.status),
          !prices?.length ||
            (unitPrice !== null && pricingMatch(prices, unitPrice)),
          !area?.length ||
            (aptArea !== null &&
              parseFloat(aptArea) >= area[0] &&
              parseFloat(aptArea) <= area[1])
        ];

        return meetsCriteria.every(Boolean);
      });

      return { ...floor, apartments: filteredApartments };
    })
    .filter((floor) => floor.apartments.length > 0);

  useEffect(() => {
    if (!isMobile) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [isMobile]);

  return isMobile === null ? null : (
    <div
      // @ts-ignore
      onClick={(e) => e.stopPropagation()}
      className="map3d__container__entry__content"
    >
      <motion.button
        // @ts-ignore
        onClick={(e) => {
          e.stopPropagation();
          startTransition(() => {
            if (property) {
              setProperty(null);
            } else if (isMobile) {
              setShowFilters(false);
            } else {
              setTower(null);
            }
          });
        }}
        className="map3d__container__entry__content__close"
      >
        {isPending ? (
          <Loader small />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </motion.button>
      <div className="map3d__container__entry__content__left">
        {isMobile && (
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="map3d__container__entry__content__left__filter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-filter"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        )}
        <div className="map3d__container__entry__content__left__heading">
          <div className="map3d__container__entry__content__left__heading__text">
            {lang === "ar" ? `برج ${index + 1}` : `Tower ${index + 1}`}
          </div>
        </div>
        <div className="map3d__container__entry__content__left__floors">
          {filteredFloorList.map((floor) => (
            <Floor
              key={floor.name}
              name={floor.name}
              apartments={floor.apartments}
            />
          ))}
        </div>
      </div>
      {(showFilters || property) && (
        <div className="map3d__container__entry__content__right">
          <div className="map3d__container__entry__content__right__details" />
          <Filters
            apartments={apartments}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      )}
    </div>
  );
}
