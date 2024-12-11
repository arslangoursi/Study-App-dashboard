"use client";

import ClickAwayListener from "react-click-away-listener";
import RangeTwoLabeled from "./RangeTwoLabeled";
import colors from "@/data/mapColors.json";
import { useState } from "react";
import { pricingFilters } from "@/constants/constants";
import useLanguage from "@/hooks/useLanguage";

export default function MapOverlayFilters2d({
  lands,
  filters,
  setFilters
}: {
  lands: {
    id: string;
    plot: string;
    status: string;
    details: {
      entity: string;
      batch: string | null;
      area: string | null;
      unitPrice: number | null;
      images: string[];
    };
  }[];
  filters: {
    blocks: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null;
  setFilters: (filters: {
    blocks: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  }) => void;
}) {
  const [lang] = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const blocks = lands.reduce<string[]>((acc, land) => {
    if (land.details.batch && !acc.includes(land.details.batch)) {
      acc.push(land.details.batch);
    }
    return acc;
  }, []);

  const statuses = lands.reduce<string[]>((acc, land) => {
    if (!acc.includes(land.status)) {
      acc.push(land.status);
    }
    return acc;
  }, []);

  const minArea = Math.min(
    ...lands.map((land) => parseFloat(land.details.area || "0"))
  );

  const maxArea = Math.max(
    ...lands.map((land) => parseFloat(land.details.area || "0"))
  );

  return (
    <div className="map__overlay__filters">
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <div className={`map__overlay__filters__modal ${isOpen ? "open" : ""}`}>
          <div className="map__overlay__filters__modal__header">
            <div className="map__overlay__filters__modal__header__title">
              {lang === "ar" ? "تصفية" : "Filters"}
            </div>
            <button
              className="map__overlay__filters__modal__header__clear"
              onClick={() => {
                setFilters({
                  blocks: [],
                  statuses: [],
                  prices: [],
                  area: [minArea, maxArea]
                });
              }}
            >
              {lang === "ar" ? "مسح" : "Reset"}
            </button>
          </div>
          <div className="map__overlay__filters__modal__body">
            <div className="map__overlay__filters__modal__body__entry">
              <div className="map__overlay__filters__modal__body__entry__title">
                {lang === "ar" ? "الكتل" : "Blocks"}
              </div>
              <div className="map__overlay__filters__modal__body__entry__options">
                {blocks.map((block, index) => (
                  <div
                    key={index}
                    className={`map__overlay__filters__modal__body__entry__options__option ${
                      filters?.blocks?.includes(block) ? "selected" : ""
                    }`}
                    onClick={() => {
                      const newBlocks = filters?.blocks?.includes(block)
                        ? filters.blocks.filter((b) => b !== block)
                        : [...(filters?.blocks || []), block];
                      setFilters({
                        blocks: newBlocks,
                        statuses: filters?.statuses || [],
                        prices: filters?.prices || [],
                        area: filters?.area || [minArea, maxArea]
                      });
                    }}
                  >
                    {block}
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
                      filters?.prices.includes(price.value) ? "active" : ""
                    }`}
                    onClick={() => {
                      const newPrices = filters?.prices.includes(price.value)
                        ? filters.prices.filter((p) => p !== price.value)
                        : [...(filters?.prices || []), price.value];
                      setFilters({
                        blocks: filters?.blocks || [],
                        statuses: filters?.statuses || [],
                        prices: newPrices,
                        area: filters?.area || [minArea, maxArea]
                      });
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
                  setValues={(area) =>
                    setFilters({
                      blocks: filters?.blocks || [],
                      statuses: filters?.statuses || [],
                      prices: filters?.prices || [],
                      area
                    })
                  }
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
                    className={
                      "map__overlay__filters__modal__body__entry__options__status" +
                      (filters?.statuses?.includes(status) ? " selected" : "")
                    }
                    onClick={() => {
                      const newStatuses = filters?.statuses?.includes(status)
                        ? filters.statuses.filter((s) => s !== status)
                        : [...(filters?.statuses || []), status];
                      setFilters({
                        blocks: filters?.blocks || [],
                        statuses: newStatuses,
                        prices: filters?.prices || [],
                        area: filters?.area || [minArea, maxArea]
                      });
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
