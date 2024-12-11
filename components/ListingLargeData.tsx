export default function ListingLargeData({ value }: { value: string }) {
  return (
    <div className="listing__page__table__content__row__entry">
      <div className="listing__page__table__content__row__entry__description">
        <div className="listing__page__table__content__row__entry__description__label">
          View All
        </div>
        <div className="listing__page__table__content__row__entry__description__popup">
          {value}
        </div>
      </div>
    </div>
  );
}
