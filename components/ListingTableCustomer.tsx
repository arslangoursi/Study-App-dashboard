import { CSSProperties, ReactNode } from "react";

import { IListingAction } from "@/interfaces";
import ListingActionBar from "@/components/ListingActionBar";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingHeaderEntry from "@/components/ListingHeaderEntry";
import useLanguage from "@/hooks/useLanguage";

interface IListingTable {
  children: ReactNode;
  actions: IListingAction[];
  selectedRows: string[];
  setSelectedRows: (value: string[]) => void;
  sortData: {
    key: string;
    order: "asc" | "desc";
  };
  setSortData: (value: { key: string; order: "asc" | "desc" }) => void;
  headerItems: {
    key: string;
    name: string;
    nameAr: string;
    hasImage?: boolean;
    style?: CSSProperties;
  }[];
  data: any[];
}

export default function ListingTable({
  children,
  actions,
  selectedRows,
  setSelectedRows,
  sortData,
  setSortData,
  headerItems,
  data
}: IListingTable) {
  const [lang] = useLanguage();

  return (
    <div className="listing__page__table" style={{ height: "fit-content" }}>
      <div
        className="listing__page__table__scrollable"
        style={{ height: "fit-content" }}
      >
        <ListingActionBar selectedItems={selectedRows?.length}>
          {actions.map((action) => (
            <button
              type="button"
              key={action.name}
              className={`listing__page__table__actions__button ${
                action.sale ? "sale" : ""
              }`}
              onClick={() => {
                setSelectedRows([]);
                action.onClick();
              }}
            >
              {action.icon}
              {action.name}
            </button>
          ))}
        </ListingActionBar>
        <div className="listing__page__table__header">
          <ListingHeaderEntry className="checkbox">
            <ListingCheckbox
              checked={selectedRows.length === data.length}
              partiallyChecked={
                selectedRows.length > 0 && selectedRows.length < data.length
              }
              onClick={() => {
                if (selectedRows.length === data.length) {
                  setSelectedRows([]);
                } else {
                  setSelectedRows(data.map((item) => item.id));
                }
              }}
            />
          </ListingHeaderEntry>
          {headerItems.map((item) => (
            <ListingHeaderEntry
              key={item.key}
              sortKey={item.key}
              sortData={sortData}
              onSort={(value) => setSortData(value)}
              hasImage={item.hasImage}
              style={item.style}
            >
              {lang === "ar" ? item.nameAr : item.name}
            </ListingHeaderEntry>
          ))}
        </div>
        <div className="listing__page__table__content">{children}</div>
      </div>
    </div>
  );
}
