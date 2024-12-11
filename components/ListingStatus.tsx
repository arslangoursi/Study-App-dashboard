import { tabColors } from "@/constants/color";

export default function ListingStatus({ value }: { value: string }) {
  const backgroundColor =
    tabColors[
      value?.toLowerCase().replaceAll("_", " ") as keyof typeof tabColors
    ];

  return (
    <div className="listing__page__table__content__row__entry">
      <div
        style={{ backgroundColor }}
        className="listing__page__table__content__row__entry__status"
      >
        {value.replace(/_/g, " ").charAt(0).toUpperCase() +
          value.replace(/_/g, " ").slice(1).toLowerCase()}
      </div>
    </div>
  );
}
