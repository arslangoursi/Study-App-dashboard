"use client";

import RangeTwoLabeledV2 from "./RangeTwoLabeledV2";
import colors from "@/data/mapColors.json";
import { IMap3dApartment } from "@/interfaces";
import useLanguage from "@/hooks/useLanguage";
import { useEffect, useMemo } from "react";
import { pricingFilters } from "@/constants/constants";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function ApartmentSvgUiFilters({
  apartments,
  filters,
  setFilters
}: {
  apartments: IMap3dApartment[];
  filters: {
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null;
  setFilters: (filters: {
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  }) => void;
}) {
  const [lang] = useLanguage();

  const towers = useMemo(
    () =>
      apartments.reduce<string[]>((acc, apartment) => {
        if (apartment.details.tower && !acc.includes(apartment.details.tower)) {
          acc.push(apartment.details.tower);
        }
        return acc;
      }, []),
    [apartments]
  );

  const floors = useMemo(
    () =>
      apartments
        .filter((apartment) =>
          filters?.towers.length
            ? filters.towers.includes(apartment.details.tower || "")
            : true
        )
        .reduce<string[]>((acc, apartment) => {
          if (
            apartment.details.batch &&
            !acc.includes(apartment.details.batch)
          ) {
            acc.push(apartment.details.batch);
          }
          return acc;
        }, []),
    [apartments, filters?.towers]
  );

  const bedrooms = useMemo(
    () =>
      apartments
        .filter((apartment) =>
          filters?.floors.length
            ? filters.floors.includes(apartment.details.batch || "")
            : true
        )
        .reduce<string[]>((acc, apartment) => {
          const bedroomLabel = apartment.details.numberOfBedrooms
            ? `${apartment.details.numberOfBedrooms} bedroom`
            : "Studio";
          if (!acc.includes(bedroomLabel)) {
            acc.push(bedroomLabel);
          }
          return acc;
        }, []),
    [apartments, filters?.floors]
  );

  const statuses = useMemo(
    () =>
      apartments.reduce<string[]>((acc, apartment) => {
        if (!acc.includes(apartment.status)) {
          acc.push(apartment.status);
        }
        return acc;
      }, []),
    [apartments]
  );

  const minArea = useMemo(
    () =>
      Math.min(
        ...apartments.map((apartment) =>
          parseFloat(apartment.details.area || "0")
        )
      ),
    [apartments]
  );

  const maxArea = useMemo(
    () =>
      Math.max(
        ...apartments.map((apartment) =>
          parseFloat(apartment.details.area || "0")
        )
      ),
    [apartments]
  );

  useEffect(() => {
    if (filters?.prices.length === 0) {
      setFilters({
        towers: [],
        floors: [],
        bedrooms: [],
        statuses: [],
        prices: [],
        area: [minArea, maxArea]
      });
    }
  }, [apartments]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters({
      towers: filters?.towers || [],
      floors: filters?.floors || [],
      bedrooms: filters?.bedrooms || [],
      statuses: filters?.statuses || [],
      prices: filters?.prices || [],
      area: filters?.area || [minArea, maxArea],
      ...newFilters
    });
  };

  const [showFilters, setShowFilters] = useQueryState(
    "showFilters",
    parseAsBoolean.withDefault(false)
  );

  return (
    showFilters && (
      <div className="svg__based__selling__ui__sidebar__left__filters">
        <div className="svg__based__selling__ui__sidebar__left__filters__header">
          <div className="svg__based__selling__ui__sidebar__left__filters__header__title">
            {lang === "en" ? "Filters" : "الفلاتر"}
          </div>
          <button
            onClick={() => {
              setFilters({
                towers: [],
                floors: [],
                bedrooms: [],
                statuses: [],
                prices: [],
                area: [minArea, maxArea]
              });
            }}
            className="svg__based__selling__ui__sidebar__left__filters__header__btn"
          >
            {lang === "en" ? "Reset" : "إعادة تعيين"}
          </button>
        </div>
        <div className="svg__based__selling__ui__sidebar__left__filters__body">
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "en" ? "Towers" : "المباني"}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__options">
              {towers.map((tower, index) => (
                <button
                  key={index}
                  className={`svg__based__selling__ui__sidebar__left__filters__body__entry__options__entry ${
                    filters?.towers.includes(tower) ? "active" : ""
                  }`}
                  onClick={() =>
                    updateFilters({
                      towers: filters?.towers.includes(tower)
                        ? filters.towers.filter((t) => t !== tower)
                        : [...(filters?.towers || []), tower],
                      floors: [],
                      bedrooms: []
                    })
                  }
                >
                  {tower.replace("T", lang === "ar" ? "برج" : "Tower")}
                </button>
              ))}
            </div>
          </div>
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "ar" ? "الطوابق" : "Floors"}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__options">
              {floors.map((floor, index) => (
                <button
                  key={index}
                  className={`svg__based__selling__ui__sidebar__left__filters__body__entry__options__entry ${
                    filters?.floors.includes(floor) ? "active" : ""
                  }`}
                  onClick={() =>
                    updateFilters({
                      floors: filters?.floors.includes(floor)
                        ? filters.floors.filter((f) => f !== floor)
                        : [...(filters?.floors || []), floor],
                      bedrooms: []
                    })
                  }
                >
                  {floor === "GF"
                    ? lang === "ar"
                      ? "الطابق الارضي"
                      : "Ground Floor"
                    : floor === "Roof Floor"
                      ? lang === "ar"
                        ? "الطابق السطحي"
                        : "Roof Floor"
                      : floor === "Roof Annex Floor"
                        ? lang === "ar"
                          ? "الطابق السطحي الملحق"
                          : "Roof Annex Floor"
                        : floor}
                </button>
              ))}
            </div>
          </div>
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "ar" ? "الغرف" : "Bedrooms"}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__options">
              {bedrooms.map((bedroom, index) => (
                <button
                  key={index}
                  className={`svg__based__selling__ui__sidebar__left__filters__body__entry__options__entry ${
                    filters?.bedrooms.includes(bedroom) ? "active" : ""
                  }`}
                  onClick={() =>
                    updateFilters({
                      bedrooms: filters?.bedrooms.includes(bedroom)
                        ? filters.bedrooms.filter((b) => b !== bedroom)
                        : [...(filters?.bedrooms || []), bedroom]
                    })
                  }
                >
                  {bedroom.replace(
                    "bedroom",
                    lang === "ar" ? "غرفة" : "Bedroom"
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "ar" ? "السعر" : "Price"}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__options">
              {pricingFilters.map((price, index) => (
                <button
                  key={index}
                  className={`svg__based__selling__ui__sidebar__left__filters__body__entry__options__entry ${
                    filters?.prices.includes(price.value) ? "active" : ""
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
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "ar" ? "المساحة" : "Area"}
            </div>
            {filters?.area.length === 0 ? null : (
              <RangeTwoLabeledV2
                values={filters?.area || [minArea, maxArea]}
                setValues={(area) => updateFilters({ area })}
                min={minArea}
                max={maxArea}
                type="area"
              />
            )}
          </div>
          <div className="svg__based__selling__ui__sidebar__left__filters__body__entry">
            <div className="svg__based__selling__ui__sidebar__left__filters__body__entry__title">
              {lang === "ar" ? "الحالة" : "Status"}
            </div>
            <div className="map__overlay__filters__modal__body__entry__options">
              {statuses.map((status) => (
                <button
                  key={status}
                  className={
                    "map__overlay__filters__modal__body__entry__options__status" +
                    (filters?.statuses?.includes(status) ? " active" : "")
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
                  {
                    {
                      AVAILABLE: lang === "ar" ? "متاح" : "Available",
                      ON_HOLD: lang === "ar" ? "محجوز" : "Reserved",
                      SOLD: lang === "ar" ? "مباع" : "Sold"
                    }[status]
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="svg__based__selling__ui__sidebar__left__filters__footer"
          style={{
            display: "flex",
            justifyContent: lang === "en" ? "flex-end" : "flex-start"
          }}
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              maxWidth: "fit-content",
              padding: "0 1.5em"
            }}
            className="svg__based__selling__ui__sidebar__left__filters__footer__button"
          >
            {lang === "en" ? "Apply" : "تطبيق"}
          </button>
        </div>
      </div>
    )
  );
}
