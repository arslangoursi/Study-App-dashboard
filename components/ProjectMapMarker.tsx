"use client";

import { IMarker } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { Marker } from "react-map-gl";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";

export default function ProjectMapMarker({ map }: { map: IMarker }) {
  const pathname = usePathname();
  const [lang] = useLanguage();

  return (
    <Marker latitude={map.latitude ?? 0} longitude={map.longitude ?? 0}>
      <div className="project__details__marker">
        <Image
          className="project__details__marker__img"
          src={map.logoIcon ?? ""}
          alt={
            map.name
              ? lang === "ar"
                ? (map.name.ar ?? "No name available")
                : (map.name.en ?? "No name available")
              : "No name available"
          }
          width={50}
          height={50}
        />
        <div className="project__details__marker__info">
          <Image
            className="project__details__marker__info__img"
            src={map.logoIcon ?? ""}
            alt={
              map.name
                ? lang === "ar"
                  ? (map.name.ar ?? "No name available")
                  : (map.name.en ?? "No name available")
                : "No name available"
            }
            width={50}
            height={50}
          />
          <div className="project__details__marker__info__name">
            {map.name
              ? lang === "ar"
                ? (map.name.ar ?? "")
                : (map.name.en ?? "")
              : ""}
          </div>
          <div className="project__details__marker__info__area">
            {map.area ? `${map.area} m²` : ""}
          </div>
          <div className="project__details__marker__info__description">
            {map.description
              ? lang === "ar"
                ? (map.description.ar ?? "")
                : (map.description.en ?? "")
              : ""}
          </div>
          <Link
            href={pathname + `/${map.number}`}
            className="project__details__marker__info__link"
          >
            {lang === "ar" ? "المزيد" : "More"}
          </Link>
        </div>
      </div>
    </Marker>
  );
}
