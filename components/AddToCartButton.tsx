"use client";

import { cartAtom, cartStatusAtom } from "@/constants/state";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";

import Loader from "./Loader";
import { useAtom } from "jotai";
import useLanguage from "@/hooks/useLanguage";
import { useMemo, useTransition } from "react";
import { IAddToCartButton } from "@/interfaces";
import { useQueryState } from "nuqs";

export default function AddToCartButton({ data }: { data?: IAddToCartButton }) {
  const { projectNumber, mapNumber } = useParams();
  const [lang] = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tower = searchParams.get("tower");
  const [, setProperty] = useQueryState("property");
  const [cart, setCart] = useAtom(cartAtom);
  const [, setCartOpen] = useAtom(cartStatusAtom);
  const [isPending, startTransition] = useTransition();

  const addToCart = () => {
    if (data?.status === "AVAILABLE") {
      if (data) {
        const newCart = [...cart];

        const existingItem = newCart.find(
          (item) =>
            item.projectNumber === projectNumber && item.mapNumber === mapNumber
        );

        if (existingItem) {
          const existingProperty = existingItem.property.find(
            (prop) => prop.id === data.id
          );

          if (existingProperty) {
            existingProperty.batch = data.batch || "";
            existingProperty.area = data.area || "";
            existingProperty.unitPrice = data.unitPrice || 0;
            existingProperty.images = data.images;
          } else {
            existingItem.property.push({
              id: data.id,
              entity: data.entity,
              batch: data.batch || "",
              area: data.area || "",
              unitPrice: data.unitPrice || 0,
              images: data.images
            });
          }
        } else {
          const newCartItem = {
            projectNumber: projectNumber as string,
            mapNumber: mapNumber as string,
            property: [
              {
                id: data.id,
                entity: data.entity,
                batch: data.batch || "",
                area: data.area || "",
                unitPrice: data.unitPrice || 0,
                images: data.images
              }
            ],
            message: ""
          };
          newCart.push(newCartItem);
        }

        setCart(newCart);
        startTransition(() => {
          setProperty(null);
        });
        setCartOpen(true);
      }
    }
  };

  const removeFromCart = () => {
    if (data) {
      const newCart = cart.filter(
        (item) =>
          item.projectNumber !== projectNumber ||
          item.mapNumber !== mapNumber ||
          !item.property.some((prop) => prop.id === data.id)
      );
      setCart(newCart);
    }
  };

  const isInCart = useMemo(
    () =>
      cart.some(
        (item) =>
          item.projectNumber === projectNumber &&
          item.mapNumber === mapNumber &&
          item.property.some((prop) => prop.id === data?.id)
      ),
    [cart, data?.id, mapNumber, projectNumber]
  );

  return (
    <button
      type="button"
      onClick={isInCart ? removeFromCart : addToCart}
      disabled={isPending || data?.status !== "AVAILABLE"}
      className={
        "map__overlay__detail__modal__body__button" +
        (isInCart ? " in__cart" : "")
      }
      onLoad={() => {
        if (tower) {
          router.prefetch(pathname + "?tower=" + tower);
        }
      }}
    >
      {isInCart ? (
        <>{lang === "ar" ? "إزالة من السلة" : "Remove from Cart"}</>
      ) : data?.status === "AVAILABLE" ? (
        <>
          {isPending && <Loader small />}
          {lang === "ar" ? "استكمال إجراءات الحجز" : "Add to Cart"}
        </>
      ) : data?.status === "RESERVED" ? (
        <>{lang === "ar" ? "محجوز" : "Reserved"}</>
      ) : data?.status === "SOLD" ? (
        <>{lang === "ar" ? "مباع" : "Sold"}</>
      ) : (
        <>{lang === "ar" ? "غير متوفر" : "Not Available"}</>
      )}
    </button>
  );
}
