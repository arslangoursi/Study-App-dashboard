import { CSSProperties, ReactNode } from "react";

import AscendingIcon from "@/icons/AscendingIcon";
import DescendingIcon from "@/icons/DescendingIcon";

interface IListingHeaderEntry {
  className?: string;
  children: ReactNode;
  sortKey?: string;
  sortData?: {
    key: string;
    order: "asc" | "desc";
  };
  onSort?: (data: { key: string; order: "asc" | "desc" }) => void;
  style?: CSSProperties;
  hasImage?: boolean;
}

export default function ListingHeaderEntry({
  className,
  children,
  sortKey,
  sortData,
  onSort,
  style,
  hasImage
}: IListingHeaderEntry) {
  return (
    <div
      style={style}
      className={
        "listing__page__table__header__entry " +
        (hasImage ? "has__image" : "") +
        (className || "")
      }
    >
      {children}
      {sortKey && sortData && (
        <button
          type="button"
          onClick={() => {
            if (onSort) {
              onSort({
                key: sortKey,
                order: sortData?.order === "asc" ? "desc" : "asc"
              });
            }
          }}
          className="listing__page__table__header__entry__sort"
        >
          {sortData?.key === sortKey ? (
            sortData.order === "asc" ? (
              <AscendingIcon />
            ) : (
              <DescendingIcon />
            )
          ) : (
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
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
