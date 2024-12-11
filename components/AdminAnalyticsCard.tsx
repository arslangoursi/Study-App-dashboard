import { IListingAnalyticsCard } from "@/interfaces";

export default function AdminAnalyticsCard({
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
        <div className="listing__page__analytics__card__content__value">
          {value}
        </div>
        <div className="listing__page__analytics__card__content__title">
          {title}
        </div>
      </div>
      {icon}
    </div>
  );
}
