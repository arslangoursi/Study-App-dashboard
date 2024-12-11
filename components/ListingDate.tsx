import dayjs from "dayjs";

export default function ListingDate({
  date,
  format
}: {
  date: string | Date;
  format?: string;
}) {
  return (
    <div className="listing__page__table__content__row__entry">
      {dayjs(date).isValid()
        ? dayjs(date).format(format ? format : "DD MMM YYYY")
        : "-"}
    </div>
  );
}
