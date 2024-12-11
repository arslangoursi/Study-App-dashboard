"use client";

import { useTransition } from "react";
import Loader from "./Loader";
import { useQueryState } from "nuqs";

export default function ApartmentSvgUiDetailsLinkToMap() {
  const [, setView] = useQueryState("view");

  const [isPending, startTransition] = useTransition();

  const handleMapClick = () => {
    startTransition(() => {
      setView("model");
    });
  };

  return (
    <button
      type="button"
      onClick={handleMapClick}
      className="svg__based__selling__ui__content__actions__button to__map"
    >
      {isPending ? (
        <Loader small color="currentColor" />
      ) : (
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.87516 2.99065L1.8335 5.93223V20.2084L6.87516 18.1303V2.99065ZM8.7085 17.8342L13.2918 20.5402V5.1659L8.7085 2.45898V17.8342ZM15.1252 4.86982V20.0095L20.1668 17.0679V2.79173L15.1252 4.86982Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
