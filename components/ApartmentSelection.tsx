"use client";

import "@/styles/map3d.scss";

import Image from "next/image";
import Loader from "@/components/Loader";
import Tower from "@/components/Towers";
import { motion } from "framer-motion";
import useHideScrollBar from "@/hooks/useHideScrollBar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useSearchParams } from "next/navigation";
import { IMap3dApartment } from "@/interfaces";
import MapCart from "./MapCart";
import MapActions from "./MapActions";
import PortalToApartmentDetails from "./PortalToApartmentDetails";
import PropertyDetails from "./PropertyDetails";
import PropertyDetailsClient3d from "./PropertyDetailsClient3d";

export default function Map3dSelection({
  apartments
}: {
  apartments: IMap3dApartment[];
}) {
  const searchParams = useSearchParams();
  const selectedTower = searchParams.get("tower");
  const property = searchParams.get("property");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useHideScrollBar([selectedTower]);

  const towerNames = Array.from(
    new Set(apartments.map(({ details }) => details.tower))
  );

  const floors = apartments.reduce(
    (acc, apartment) => {
      const { tower, batch } = apartment.details;
      if (tower === selectedTower && batch) {
        (acc[batch] ??= []).push(apartment);
      }
      return acc;
    },
    {} as { [key: string]: IMap3dApartment[] }
  );

  const floorList = Object.entries(floors).map(([batch, apartments]) => ({
    name: batch,
    apartments
  }));

  const apartment = apartments.find(
    (apartment: { id: string }) => apartment.id === property
  );

  const propertyDetails = {
    id: apartment?.id || "",
    entity: apartment?.details.entity || "",
    batch: apartment?.details.batch || null,
    area: apartment?.details.area || null,
    unitPrice: apartment?.details.unitPrice || 0,
    images: apartment?.details.images || [],
    status: apartment?.status || "NOT_SELLABLE"
  };

  return isTablet === null || isMobile === null ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100dvh"
      }}
    >
      <Loader />
    </div>
  ) : (
    <>
      <MapCart />
      <MapActions />
      {property && (
        <PortalToApartmentDetails>
          <PropertyDetails isApartment data={propertyDetails}>
            <PropertyDetailsClient3d />
          </PropertyDetails>
        </PortalToApartmentDetails>
      )}
      <Image
        src={`/3d/3d_background.webp`}
        alt="3d tower"
        width={1920}
        height={1080}
        fetchPriority="high"
        style={{
          width: "100%",
          height: "99.5dvh"
        }}
      />
      <motion.div
        // @ts-ignore
        className="map3d__container"
        initial={{
          padding: ".5em",
          backgroundColor: "var(--white)"
        }}
        animate={{
          padding: selectedTower === null ? ".5em" : "0",
          backgroundColor:
            selectedTower === null ? "var(--white)" : "transparent"
        }}
      >
        {towerNames.map((towerName, index) => (
          <Tower
            key={towerName}
            towerNames={towerNames}
            towerName={towerName}
            index={index}
            floorList={floorList}
            apartments={apartments}
          />
        ))}
      </motion.div>
    </>
  );
}
