export default function ListingProgressBar({
  value,
  color
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="listing__page__table__content__row__entry">
      <div className="listing__page__table__content__row__entry__progress">
        <div
          style={{ width: `${value}%`, backgroundColor: color }}
          className="listing__page__table__content__row__entry__progress__bar"
        />
      </div>
    </div>
  );
}
