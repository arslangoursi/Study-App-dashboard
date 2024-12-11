"use state";

import Image from "next/image";
import { useState } from "react";

export default function ApartmentSvgUiDetailsGallery({
  images
}: {
  images: string[];
}) {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  return (
    <>
      <div
        className="map__overlay__detail__modal__image__overlay__right__gallery__popup__content"
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <button
          type="button"
          onClick={() => {
            const currentIndex = images.findIndex(
              (image) => image === currentImage
            );
            if (currentIndex === 0) {
              setCurrentImage(images[images.length - 1]);
            } else {
              setCurrentImage(images[currentIndex - 1]);
            }
          }}
          className="map__overlay__detail__modal__image__overlay__right__gallery__popup__button prev"
          style={{
            bottom: "1em",
            left: "calc(50% - 50px)",
            top: "auto"
          }}
          disabled={images.findIndex((image) => image === currentImage) === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <Image
          width={1920}
          height={1080}
          quality={70}
          src={currentImage}
          alt="Property Image"
          className="map__overlay__detail__modal__image__overlay__right__gallery__popup__image"
          style={{
            width: "100%",
            height: "100%"
          }}
        />
        <button
          type="button"
          onClick={() => {
            const currentIndex = images.findIndex(
              (image) => image === currentImage
            );
            if (currentIndex === images.length - 1) {
              setCurrentImage(images[0]);
            } else {
              setCurrentImage(images[currentIndex + 1]);
            }
          }}
          className="map__overlay__detail__modal__image__overlay__right__gallery__popup__button next"
          style={{
            bottom: "1em",
            right: "calc(50% - 50px)",
            top: "auto"
          }}
          disabled={
            images.findIndex((image) => image === currentImage) ===
            images.length - 1
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
