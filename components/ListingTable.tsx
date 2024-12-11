import { IListingTable } from "@/interfaces";
import ListingActionBar from "@/components/ListingActionBar";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingHeaderEntry from "@/components/ListingHeaderEntry";
import Loader from "./Loader";
import useLanguage from "@/hooks/useLanguage";

export default function ListingTable({
  style,
  children,
  actions,
  selectedRows,
  setSelectedRows = () => {},
  sortData,
  setSortData = () => {},
  headerItems,
  data,
  onAdd,
  isFetchingData,
  isStale,
  noCheckbox
}: IListingTable) {
  const [lang] = useLanguage();

  return (
    <div className="listing__page__table" style={style}>
      <div className="listing__page__table__scrollable">
        {selectedRows && (actions?.length ?? 0) > 0 && (
          <ListingActionBar selectedItems={selectedRows?.length}>
            {actions?.map((action) => (
              <button
                type="button"
                key={action.name}
                className={`listing__page__table__actions__button ${
                  action.danger ? "danger" : ""
                }`}
                onClick={async () => {
                  await action.onClick();
                  setSelectedRows([]);
                }}
              >
                {action.icon}
                {action.name}
              </button>
            ))}
          </ListingActionBar>
        )}
        <div className="listing__page__table__header">
          {selectedRows && !noCheckbox && (
            <ListingHeaderEntry className="checkbox">
              <ListingCheckbox
                checked={
                  selectedRows.length === data?.length && data?.length > 0
                }
                partiallyChecked={
                  selectedRows.length > 0 && selectedRows.length < data.length
                }
                onClick={() => {
                  if (selectedRows.length === data?.length) {
                    setSelectedRows([]);
                  } else {
                    setSelectedRows(data?.map((item) => item.id));
                  }
                }}
              />
            </ListingHeaderEntry>
          )}
          {headerItems?.map((item) => (
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
        <div
          className={
            "listing__page__table__content" + (isStale ? " stale" : "")
          }
        >
          {isFetchingData ? (
            <div className="listing__page__table__content__empty">
              <Loader />
            </div>
          ) : data?.length === 0 ? (
            <div className="listing__page__table__content__empty">
              {lang === "ar" ? "لا توجد بيانات" : "No data available"}
              {onAdd && (
                <button
                  type="button"
                  className="listing__page__table__content__empty__button"
                  onClick={onAdd}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00033 13.3307C7.57954 13.3307 7.23842 12.9896 7.23842 12.5688V8.7593H3.4289C3.00811 8.7593 2.66699 8.41818 2.66699 7.9974C2.66699 7.57661 3.00811 7.23549 3.4289 7.23549H7.23842V3.42597C7.23842 3.00518 7.57954 2.66406 8.00033 2.66406C8.42111 2.66406 8.76223 3.00518 8.76223 3.42597V7.23549H12.5718C12.9925 7.23549 13.3337 7.57661 13.3337 7.9974C13.3337 8.41818 12.9925 8.7593 12.5718 8.7593H8.76223V12.5688C8.76223 12.9896 8.42111 13.3307 8.00033 13.3307Z"
                      fill="currentColor"
                    />
                  </svg>
                  {lang === "ar" ? "إنشاء جديد" : "Create New"}
                </button>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
      <div className="listing__page__table__footer">
        <div className="listing__page__table__footer__stats">
          {selectedRows && (
            <div className="listing__page__table__footer__stats__entry">
              {selectedRows.length} {lang === "ar" ? "محدد" : "Selected"}
            </div>
          )}
          <div className="listing__page__table__footer__stats__entry">
            {data?.length} {lang === "ar" ? "مدخلات" : "Entries"}
          </div>
        </div>
      </div>
    </div>
  );
}
