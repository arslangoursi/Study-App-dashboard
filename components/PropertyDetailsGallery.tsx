"use client";

import Image from "next/image";
import { useState } from "react";

export default function PropertyDetailsGallery({
  images
}: {
  images: string[];
}) {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

  return (
    <>
      {galleryOpen && (
        <div className="map__overlay__detail__modal__image__overlay__right__gallery__popup">
          <div className="map__overlay__detail__modal__image__overlay__right__gallery__popup__content">
            <button
              type="button"
              onClick={() => setGalleryOpen(!galleryOpen)}
              className="map__overlay__detail__modal__image__overlay__right__gallery__popup__close"
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
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
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
              disabled={
                images.findIndex((image) => image === currentImage) === 0
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
        </div>
      )}
      <button
        type="button"
        onClick={() => setGalleryOpen(!galleryOpen)}
        className="map__overlay__detail__modal__image__overlay__right__gallery"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-images"
        >
          <path d="M18 22H4a2 2 0 0 1-2-2V6" />
          <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
          <circle cx="12" cy="8" r="2" />
          <rect width="16" height="16" x="6" y="2" rx="2" />
        </svg>
      </button>
    </>
  );
}
