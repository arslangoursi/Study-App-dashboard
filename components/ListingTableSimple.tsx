import { IListingTable } from "@/interfaces";
import ListingHeaderEntry from "@/components/ListingHeaderEntry";
import useLanguage from "@/hooks/useLanguage";

export default function ListingTableSimple({
  children,
  sortData,
  setSortData,
  headerItems
}: IListingTable) {
  const [lang] = useLanguage();

  return (
    <div
      style={{
        backgroundColor: "unset",
        boxShadow: "unset"
      }}
      className="listing__page__table"
    >
      <div className="listing__page__table__scrollable">
        <div className="listing__page__table__header">
          {headerItems.map((item) => (
            <ListingHeaderEntry
              key={item.key}
              sortKey={item.key}
              sortData={sortData}
              onSort={(value) => setSortData && setSortData(value)}
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
