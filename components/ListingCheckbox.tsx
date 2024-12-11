"use client";

import clsx from "clsx";

interface IListingCheckbox {
  checked: boolean;
  partiallyChecked?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function ListingCheckbox({
  checked,
  partiallyChecked,
  onClick,
  disabled
}: IListingCheckbox) {
  return (
    <button
      type="button"
      className={clsx(
        "listing__checkbox",
        checked || (partiallyChecked && "checked")
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        onClick();
      }}
    >
      {partiallyChecked ? (
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
          className="feather feather-minus"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ) : checked ? (
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
          className="feather feather-check"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : null}
    </button>
  );
}
