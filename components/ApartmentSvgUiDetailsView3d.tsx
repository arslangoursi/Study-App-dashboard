"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import useLanguage from "@/hooks/useLanguage";

export default function ApartmentSvgUiDetailsView3d({
  assets3d
}: {
  assets3d: string[];
}) {
  const [lang] = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    preloadedImages.current = assets3d.map((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        setLoadingProgress(Math.floor((loadedCount / assets3d.length) * 100));
        if (loadedCount === assets3d.length) {
          setIsLoaded(true);
        }
      };
      return img;
    });
  }, [assets3d]);

  const updateImageIndex = (start: number, current: number) => {
    const difference = current - start;
    const change = Math.floor(difference / 50);
    const newIndex =
      (currentImageIndex + change + assets3d.length) % assets3d.length;
    return newIndex;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStart !== null) {
      const newImageIndex = updateImageIndex(dragStart, e.clientX);
      if (newImageIndex !== currentImageIndex) {
        setCurrentImageIndex(newImageIndex);
      }
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    setDragStart(touchX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStart !== null) {
      const newImageIndex = updateImageIndex(dragStart, e.touches[0].clientX);
      if (newImageIndex !== currentImageIndex) {
        setCurrentImageIndex(newImageIndex);
      }
    }
  };

  const handleTouchEnd = () => {
    setDragStart(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative"
      }}
    >
      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            gap: "1rem"
          }}
        >
          <Loader />
          <div>
            {lang === "ar"
              ? `جاري التحميل ${loadingProgress}%`
              : `Loading ${loadingProgress}%`}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            position: "relative",
            touchAction: "none",
            userSelect: "none"
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            loading="lazy"
            src={preloadedImages.current[currentImageIndex]?.src}
            alt="3d view"
            width={1920}
            height={1080}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              userSelect: "none",
              touchAction: "none"
            }}
          />
        </div>
      )}
    </div>
  );
}
