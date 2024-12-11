"use client";

import ClickAwayListener from "react-click-away-listener";
import RangeTwoLabeled from "./RangeTwoLabeled";
import colors from "@/data/mapColors.json";
import { useState } from "react";
import { IMap3dApartment } from "@/interfaces";
import Loader from "./Loader";
import useLanguage from "@/hooks/useLanguage";
import { pricingFilters } from "@/constants/constants";

export default function MapOverlayFilters3d({
  apartments,
  onApply,
  isPending
}: {
  apartments: IMap3dApartment[];
  onApply: (
    filters: {
      towers: string[];
      floors: string[];
      bedrooms: string[];
      statuses: string[];
      prices: string[];
      area: number[];
    } | null
  ) => void;
  isPending: boolean;
}) {
  const [lang] = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<{
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null>(null);

  const towers = apartments.reduce<string[]>((acc, apartment) => {
    if (apartment.details.tower && !acc.includes(apartment.details.tower)) {
      acc.push(apartment.details.tower);
    }
    return acc;
  }, []);

  const floors = apartments
    .filter((apartment) =>
      filters?.towers.length
        ? filters.towers.includes(apartment.details.tower || "")
        : true
    )
    .reduce<string[]>((acc, apartment) => {
      if (apartment.details.batch && !acc.includes(apartment.details.batch)) {
        acc.push(apartment.details.batch);
      }
      return acc;
    }, []);

  const bedrooms = apartments
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
    }, []);

  const statuses = apartments.reduce<string[]>((acc, apartment) => {
    if (!acc.includes(apartment.status)) {
      acc.push(apartment.status);
    }
    return acc;
  }, []);

  const minArea = Math.min(
    ...apartments.map((apartment) => parseFloat(apartment.details.area || "0"))
  );

  const maxArea = Math.max(
    ...apartments.map((apartment) => parseFloat(apartment.details.area || "0"))
  );

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

  return (
    <div className="map__overlay__filters">
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <div className={`map__overlay__filters__modal ${isOpen ? "open" : ""}`}>
          <div className="map__overlay__filters__modal__header">
            <div className="map__overlay__filters__modal__header__title">
              {lang === "ar" ? "تصفية" : "Filters"}
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
              className="map__overlay__filters__modal__header__clear"
            >
              {lang === "ar" ? "مسح" : "Reset"}
            </button>
          </div>
          <div className="map__overlay__filters__modal__body">
            <div className="map__overlay__filters__modal__body__entry">
              <div className="map__overlay__filters__modal__body__entry__title">
                {lang === "ar" ? "أبراج" : "Towers"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {towers.map((tower, index) => (
                  <div
                    key={index}
                    className={`map__overlay__filters__modal__body__entry__options__option ${
                      filters?.towers.includes(tower) ? "selected" : ""
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
                    {tower}
                  </div>
                ))}
              </div>
            </div>
            <div className="map__overlay__filters__modal__body__entry">
              <div className="map__overlay__filters__modal__body__entry__title">
                {lang === "ar" ? "الطوابق" : "Floors"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {floors.map((floor, index) => (
                  <div
                    key={index}
                    className={`map__overlay__filters__modal__body__entry__options__option ${
                      filters?.floors.includes(floor) ? "selected" : ""
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
                    {floor}
                  </div>
                ))}
              </div>
            </div>
            <div className="map__overlay__filters__modal__body__entry">
              <div className="map__overlay__filters__modal__body__entry__title">
                {lang === "ar" ? "غرف النوم" : "Bedrooms"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {bedrooms.map((bedroom, index) => (
                  <div
                    key={index}
                    className={`map__overlay__filters__modal__body__entry__options__option ${
                      filters?.bedrooms.includes(bedroom) ? "selected" : ""
                    }`}
                    onClick={() =>
                      updateFilters({
                        bedrooms: filters?.bedrooms.includes(bedroom)
                          ? filters.bedrooms.filter((b) => b !== bedroom)
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
                {lang === "ar" ? "السعر" : "Price"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {pricingFilters.map((price, index) => (
                  <button
                    key={index}
                    className={`map__overlay__filters__modal__body__entry__options__option ${
                      filters?.prices.includes(price.value) ? "selected" : ""
                    }`}
                    onClick={() => {
                      const newPrices = filters?.prices.includes(price.value)
                        ? filters.prices.filter((p) => p !== price.value)
                        : [...(filters?.prices || []), price.value];
                      updateFilters({ prices: newPrices });
                    }}
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
                {lang === "ar" ? "الحالة" : "Status"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className={`map__overlay__filters__modal__body__entry__options__status ${
                      filters?.statuses?.includes(status) ? "selected" : ""
                    }`}
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
                    {lang === "ar"
                      ? {
                          SOLD: "تم البيع",
                          ON_HOLD: "معلق",
                          AVAILABLE: "متاح",
                          NOT_SELLABLE: "غير قابل للبيع",
                          NO_DETAILS: "لا يوجد تفاصيل"
                        }[status]
                      : {
                          SOLD: "Sold",
                          ON_HOLD: "On Hold",
                          AVAILABLE: "Available",
                          NOT_SELLABLE: "Not Sellable",
                          NO_DETAILS: "No Details"
                        }[status]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="map__overlay__filters__modal__footer">
            <button
              disabled={isPending}
              onClick={() => {
                setIsOpen(false);
                onApply(filters);
              }}
              className="map__overlay__filters__modal__footer__button"
            >
              {isPending && <Loader small />}
              {lang === "ar" ? "تطبيق" : "Apply"}
            </button>
          </div>
        </div>
      </ClickAwayListener>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="map__overlay__filters__button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-filter"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>
    </div>
  );
}
