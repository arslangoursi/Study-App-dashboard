"use client";

import RangeTwoLabeled from "@/components/RangeTwoLabeled";
import { pricingFilters } from "@/constants/constants";
import colors from "@/data/mapColors.json";
import useLanguage from "@/hooks/useLanguage";
import { IMap3dApartment } from "@/interfaces";
import { Key } from "react";

export default function Map3dSelectionFilters({
  apartments,
  filters,
  setFilters
}: {
  apartments: IMap3dApartment[];
  filters: {
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null;
  setFilters: (filters: {
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  }) => void;
}) {
  const floors = apartments.reduce(
    (acc, apartment) => {
      const { tower, batch } = apartment.details;
      if (tower && batch) {
        const towerEntry = acc[tower] || new Set();
        towerEntry.add(batch);
        acc[tower] = towerEntry;
      }
      return acc;
    },
    {} as Record<string, Set<string>>
  );

  const bedRooms = Array.from(
    new Set(
      apartments
        .map((apartment) => apartment.details.numberOfBedrooms)
        .filter((bedroom): bedroom is number => bedroom !== null)
        .map((bedroom) => `${bedroom} bedroom`)
    )
  ).sort();

  const statuses = Array.from(
    new Set(apartments.map((apartment) => apartment.status))
  );

  const areas = apartments.map((apartment) =>
    parseFloat(apartment.details.area || "0")
  );
  const minArea = Math.min(...areas);
  const maxArea = Math.max(...areas);

  const [lang] = useLanguage();

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters({
      floors: filters?.floors || [],
      bedrooms: filters?.bedrooms || [],
      statuses: filters?.statuses || [],
      prices: filters?.prices || [],
      area: filters?.area || [minArea, maxArea],
      ...newFilters
    });
  };

  return (
    <div className="map3d__container__entry__content__right__filters">
      <div className="map3d__container__entry__content__right__filters__heading">
        {lang === "ar" ? "تصفية" : "Filters"}
      </div>
      <div className="map3d__container__entry__content__right__filters__content">
        <div className="map__overlay__filters__modal__body">
          <div className="map__overlay__filters__modal__body__entry">
            <div className="map__overlay__filters__modal__body__entry__title">
              {lang === "ar" ? "طوابق" : "Floors"}
            </div>
            <div className="map__overlay__filters__modal__body__entry__options">
              {Object.values(floors)
                .sort()
                .flatMap((floor) =>
                  Array.from(floor).map(
                    (floorName: string, index: Key | null | undefined) => (
                      <div
                        key={index}
                        className={`map__overlay__filters__modal__body__entry__options__option ${
                          filters?.floors.includes(floorName) ? "selected" : ""
                        }`}
                        onClick={() =>
                          updateFilters({
                            floors: filters?.floors.includes(floorName)
                              ? filters.floors.filter((f) => f !== floorName)
                              : [...(filters?.floors || []), floorName]
                          })
                        }
                      >
                        {floorName.replace("0", "")}
                      </div>
                    )
                  )
                )}
            </div>
          </div>
          <div className="map__overlay__filters__modal__body__entry">
            <div className="map__overlay__filters__modal__body__entry__title">
              {lang === "ar" ? "غرف نوم" : "Bedrooms"}
            </div>
            <div className="map__overlay__filters__modal__body__entry__options">
              {bedRooms.map((bedroom, index) => (
                <div
                  key={index}
                  className={`map__overlay__filters__modal__body__entry__options__option ${
                    filters?.bedrooms.includes(bedroom) ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateFilters({
                      bedrooms: filters?.bedrooms.includes(bedroom)
                        ? filters.bedrooms.filter((f) => f !== bedroom)
                        : [...(filters?.bedrooms || []), bedroom]
                    })
                  }
                >
                  {bedroom}
                </div>
              ))}
            </div>
          </div>
          <div className="map__overlay__filters__modal__body__entry">
            <div className="map__overlay__filters__modal__body__entry__title">
              {lang === "ar" ? "سعر" : "Price"}
            </div>
            <div className="map__overlay__filters__modal__body__entry__options">
              {pricingFilters.map((price, index) => (
                <button
                  key={index}
                  className={`map__overlay__filters__modal__body__entry__options__option ${
                    filters?.prices.includes(price.value) ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateFilters({
                      prices: filters?.prices.includes(price.value)
                        ? filters.prices.filter((p) => p !== price.value)
                        : [...(filters?.prices || []), price.value]
                    })
                  }
                >
                  {lang === "ar" ? price.nameAr : price.name}
                </button>
              ))}
            </div>
          </div>
          <div className="map__overlay__filters__modal__body__entry">
            <div className="map__overlay__filters__modal__body__entry__title">
              {lang === "ar" ? "المساحة" : "Area"}
            </div>
            {filters?.area.length === 0 ? null : (
              <RangeTwoLabeled
                values={filters?.area || [minArea, maxArea]}
                setValues={(area) => updateFilters({ area })}
                min={minArea}
                max={maxArea}
                type="area"
              />
            )}
          </div>
          <div className="map__overlay__filters__modal__body__entry">
            <div className="map__overlay__filters__modal__body__entry__title">
              {lang === "ar" ? "حالة" : "Status"}
            </div>
            <div className="map__overlay__filters__modal__body__entry__options">
              {statuses.map((status) => (
                <div
                  key={status}
                  className={
                    "map__overlay__filters__modal__body__entry__options__status" +
                    (filters?.statuses?.includes(status) ? " selected" : "")
                  }
                  onClick={() => {
                    const newStatuses = filters?.statuses.includes(status)
                      ? filters.statuses.filter((s) => s !== status)
                      : [...(filters?.statuses || []), status];
                    updateFilters({ statuses: newStatuses });
                  }}
                >
                  <div
                    style={{
                      backgroundColor: colors[status as keyof typeof colors]
                    }}
                    className="map__overlay__filters__modal__body__entry__options__status__dot"
                  />
                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
