"use client";

import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import PropertyDetailsGallery from "./PropertyDetailsGallery";
import View360 from "./View360";
import { IPropertyDetails } from "@/interfaces";
import { useQueryState } from "nuqs";

export default function PropertyDetails({
  isApartment,
  data = {
    id: "",
    entity: "",
    batch: null,
    area: "",
    unitPrice: 0,
    images: [] as string[],
    status: ""
  },
  children
}: IPropertyDetails) {
  const [, setProperty] = useQueryState("property");

  return (
    <div className="map__overlay__detail__modal" suppressHydrationWarning>
      <div className="map__overlay__detail__modal__image">
        <button
          className="map__overlay__detail__modal__image__close"
          onClick={() => setProperty(null)}
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
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <Image
          src={
            data.images.length > 0
              ? data.images[0]
              : "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
          }
          width={300}
          height={200}
          quality={50}
          alt={data.id}
        />
        <div className="map__overlay__detail__modal__image__overlay">
          <div className="map__overlay__detail__modal__image__overlay__left">
            {data.entity}
          </div>
          <div className="map__overlay__detail__modal__image__overlay__right">
            {data.images.length > 0 && (
              <PropertyDetailsGallery images={data.images} />
            )}
            {isApartment && <View360 />}
            {/* <div className="map__overlay__detail__modal__image__overlay__right__key">
              {lang === "ar" ? "صافي السعر" : "Net Price"}
            </div>
            <div className="map__overlay__detail__modal__image__overlay__right__value">
              {data.unitPrice && (
                <CurrencyDisplay>{data.unitPrice}</CurrencyDisplay>
              )}
            </div> */}
          </div>
        </div>
      </div>
      <div className="map__overlay__detail__modal__body">
        {children}
        <AddToCartButton
          data={{
            id: data.id,
            entity: data.entity,
            batch: data.batch,
            area: data.area,
            unitPrice: data.unitPrice,
            images: data.images,
            status: data.status
          }}
        />
      </div>
    </div>
  );
}
