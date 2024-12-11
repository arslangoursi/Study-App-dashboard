"use client";

import Apartment from "./Apartments";
import ScrollContainer from "react-indiana-drag-scroll";
import colors from "@/data/mapColors.json";
import useLanguage from "@/hooks/useLanguage";
import { IMap3dApartment } from "@/interfaces";

export default function Floors({
  name,
  apartments
}: {
  name: string;
  apartments: IMap3dApartment[];
}) {
  const [lang] = useLanguage();

  const statusCounts = apartments.reduce(
    (counts: { [key: string]: number }, apartment) => {
      counts[apartment.status] = (counts[apartment.status] || 0) + 1;
      return counts;
    },
    { AVAILABLE: 0, ON_HOLD: 0, SOLD: 0 }
  );

  const { AVAILABLE: available, ON_HOLD: onHold, SOLD: sold } = statusCounts;

  return (
    <div className="map3d__container__entry__content__left__floor">
      <div className="map3d__container__entry__content__left__floor__button">
        <div className="map3d__container__entry__content__left__floor__button__name">
          {lang === "ar" ? "طابق رقم" : "Floor"} ({name})
        </div>
        <ScrollContainer
          vertical={false}
          className="map3d__container__entry__content__left__floor__button__count"
        >
          <div
            className="map3d__container__entry__content__left__floor__button__count__clip"
            style={{ backgroundColor: colors.AVAILABLE }}
          >
            <span className="map3d__container__entry__content__left__floor__button__count__clip__num">
              {available}
            </span>
            Available
          </div>
          <div
            className="map3d__container__entry__content__left__floor__button__count__clip"
            style={{ backgroundColor: colors.ON_HOLD }}
          >
            <span className="map3d__container__entry__content__left__floor__button__count__clip__num">
              {onHold}
            </span>
            On Hold
          </div>
          <div
            className="map3d__container__entry__content__left__floor__button__count__clip"
            style={{ backgroundColor: colors.SOLD }}
          >
            <span className="map3d__container__entry__content__left__floor__button__count__clip__num">
              {sold}
            </span>
            Sold
          </div>
        </ScrollContainer>
      </div>
      <div className="map3d__container__entry__content__left__floor__content">
        {apartments.map((apartment) => (
          <Apartment key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
}
