"use client";

import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter
} from "next/navigation";

import Loader from "@/components/Loader";
import { cartAtom } from "@/constants/state";
import colors from "@/data/mapColors.json";
import { useAtom } from "jotai";
import { useMemo, useTransition } from "react";
import { IMap3dApartment } from "@/interfaces";
import { useQueryState } from "nuqs";

export default function Apartments({
  apartment
}: {
  apartment: IMap3dApartment;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [cart] = useAtom(cartAtom);
  const searchParams = useSearchParams();
  const tower = searchParams.get("tower");
  const [property, setProperty] = useQueryState("property");
  const { projectNumber, mapNumber } = useParams();
  const [isPending, startTransition] = useTransition();

  const isInCart = useMemo(() => {
    return cart.some((item) => {
      if (
        item.mapNumber !== mapNumber ||
        item.projectNumber !== projectNumber
      ) {
        return false;
      }
      return item.property.some((property) => property.id === apartment.id);
    });
  }, [cart, mapNumber, projectNumber, apartment.id]);

  return (
    <button
      key={apartment.id}
      onLoad={() => {
        router.prefetch(`${pathname}?tower=${tower}&property=${apartment.id}`);
      }}
      onClick={() => {
        if (isInCart) return;
        startTransition(() => {
          setProperty(apartment.id);
        });
      }}
      className={`map3d__container__entry__content__left__floor__content__apartment${
        property === apartment.id ? " selected" : ""
      }${isInCart ? " inCart" : ""}`}
      style={{
        backgroundColor:
          colors[apartment.status as keyof typeof colors] || colors.NO_DETAILS
      }}
    >
      {isPending && <Loader small />}
      {apartment.details.entity}
    </button>
  );
}
