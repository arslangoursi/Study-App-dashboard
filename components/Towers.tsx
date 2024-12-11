import { useTransition } from "react";

import Content from "./Map3dSelectionContent";
import Image from "next/image";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IMap3dApartment } from "@/interfaces";
import useLanguage from "@/hooks/useLanguage";
import { useQueryState } from "nuqs";

export default function Towers({
  towerNames,
  towerName,
  index,
  floorList,
  apartments
}: {
  towerNames: string[];
  towerName: string;
  index: number;
  floorList: { name: string; apartments: IMap3dApartment[] }[];
  apartments: IMap3dApartment[];
}) {
  const [lang] = useLanguage();
  const [selectedTower, setSelectedTower] = useQueryState("tower");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPending, startTransition] = useTransition();

  const isActive = false;

  return (
    <motion.div
      // @ts-ignore
      onClick={() => {
        if (isActive) {
          startTransition(() => {
            if (selectedTower === null) {
              setSelectedTower(towerName);
            }
          });
        }
      }}
      key={towerName}
      className={`map3d__container__entry${isActive ? " active" : ""}`}
      initial={{
        position: "relative",
        width: `calc(${
          isMobile ? 100 : isTablet ? 50 : 100 / towerNames.length
        }% - 0.5em)`,
        height: `calc(${isMobile ? 24.9 : isTablet ? 50 : 100}dvh - 0.5em)`,
        cursor: "pointer"
      }}
      animate={{
        position:
          selectedTower === null || selectedTower !== towerName
            ? "relative"
            : "absolute",
        width:
          selectedTower === null
            ? `calc(${
                isMobile ? 100 : isTablet ? 50 : 100 / towerNames.length
              }% - 0.5em)`
            : selectedTower === towerName
              ? "100%"
              : "0",
        height:
          selectedTower === null
            ? `calc(${isMobile ? 24.9 : isTablet ? 50 : 100}dvh - 0.5em)`
            : selectedTower === towerName
              ? "100%"
              : "0",
        cursor: selectedTower === null ? "pointer" : "unset"
      }}
      transition={{
        duration: 0.5
      }}
    >
      {selectedTower === null && (
        <>
          <Image
            src={`/3d/tower${index + 1}.webp`}
            alt="3d tower"
            width={1642}
            height={3926}
            className="map3d__container__entry__img"
          />
          <div className="map3d__container__entry__overlay">
            {lang === "ar" ? "برج " + (index + 1) : "Tower " + (index + 1)}{" "}
            {!isActive && (
              <span>{lang === "ar" ? "قريب من" : "Coming Soon"}</span>
            )}
            {isPending && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Loader small />
              </div>
            )}
          </div>
        </>
      )}
      {selectedTower === towerName && (
        <Content
          index={index}
          floorList={floorList}
          apartments={apartments.filter(
            (apartment) => apartment.details.tower === towerName
          )}
        />
      )}
    </motion.div>
  );
}
