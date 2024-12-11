import { ReactNode } from "react";

export default function PropertyDetailsEntry({
  label,
  value
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="property__details__tab__entry">
      <div className="property__details__tab__entry__label">{label}</div>
      <div className="property__details__tab__entry__value">{value}</div>
    </div>
  );
}
