"use client";

import { ReactNode } from "react";

interface IListingAnalyticsCard {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}

export default function ListingAnalyticsCard({
  title,
  value,
  color,
  icon
}: IListingAnalyticsCard) {
  return (
    <div className="listing__page__analytics__card">
      <div
        className="listing__page__analytics__card__accent"
        style={{ backgroundColor: color }}
      />
      <div className="listing__page__analytics__card__content">
        <div className="listing__page__analytics__card__content__title">
          {title}
        </div>
        <div className="listing__page__analytics__card__content__value">
          {value}
        </div>
      </div>
      {icon}
    </div>
  );
}
