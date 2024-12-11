export default function ApartmentSvgUiList({
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
    <div className="svg__based__selling__ui__sidebar__left__listing__content__list">
      <div className="svg__based__selling__ui__sidebar__left__listing__content__list__header">
        <div className="svg__based__selling__ui__sidebar__left__listing__content__list__header__entry">
          Apartment
        </div>
        <div className="svg__based__selling__ui__sidebar__left__listing__content__list__header__entry">
          Area
        </div>
        <div className="svg__based__selling__ui__sidebar__left__listing__content__list__header__entry">
          Bed rooms
        </div>
        <div className="svg__based__selling__ui__sidebar__left__listing__content__list__header__entry">
          Status
        </div>
      </div>
      <div className="svg__based__selling__ui__sidebar__left__listing__content__list__content">
        {data.map(({ id, entity, details, status, color }) => (
          <button
            key={id}
            onClick={() => onClick(entity)}
            className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry"
          >
            <div className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column">
              {entity}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column">
              {details.area}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column">
              {details.numberOfBedrooms}
            </div>
            <div className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column">
              <div
                style={{ borderColor: color }}
                className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column__status"
              >
                <div
                  style={{ backgroundColor: color }}
                  className="svg__based__selling__ui__sidebar__left__listing__content__list__content__entry__column__status__dot"
                />
                {status}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
