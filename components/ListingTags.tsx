export default function ListingTags({ tags }: { tags: string[] }) {
  if (!Array.isArray(tags)) {
    return (
      <div className="listing__page__table__content__row__entry">{tags}</div>
    );
  }

  return (
    <div className="listing__page__table__content__row__entry">
      {tags?.length === 0
        ? "No tags"
        : tags?.map((tag) => (
            <div
              key={tag}
              className="listing__page__table__content__row__entry__tag"
            >
              {tag}
            </div>
          ))}
    </div>
  );
}
