export default function ApartmentSvgUiGrid({
  data,
  onClick
}: {
  data: {
    id: string;
    entity: string;
    details: any;
    status: string;
    color: string;
  }[];
  onClick: (propertyName: string) => void;
}) {
  return (
    <div className="svg__based__selling__ui__sidebar__left__listing__content__grid">
      {data.map(({ id, entity, details, status, color }) => (
        <button
          key={id}
          className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry"
          onClick={() => onClick(entity)}
        >
          <img
            loading="lazy"
            src={
              details.images.length > 0
                ? details.images[0] ||
                  "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
                : "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
            }
            width={300}
            height={200}
            alt={entity}
          />
          <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details">
            <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row">
              {entity}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row">
              <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row__entry">
                Area: {details.area}
              </div>
              <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row__entry">
                Bedrooms: {details.numberOfBedrooms}
              </div>
              <div className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row__entry">
                <div
                  style={{ borderColor: color }}
                  className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row__entry__status"
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="svg__based__selling__ui__sidebar__left__listing__content__grid__entry__details__row__entry__status__dot"
                  />
                  {status}
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
