"use state";

import { ReactNode } from "react";

export default function ApartmentSvgUiDetailsEntry({
  label,
  value,
  svg
}: {
  label: string;
  value: ReactNode;
  svg: ReactNode;
}) {
  return (
    <div className="property__row">
      <span className="property__floor">
        <div>{svg}</div>
        {label}
      </span>
      <span className="property__unit">{value}</span>
    </div>
  );
}
