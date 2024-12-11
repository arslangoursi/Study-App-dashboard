import ListingCheckbox from "@/components/ListingCheckbox";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { IListingGrid } from "@/interfaces";

export default function ListingGrid({
  children,
  actions,
  selectedRows,
  setSelectedRows = () => {},
  data,
  isFetchingData,
  isStale
}: IListingGrid) {
  return (
    <div className="listing__page__grid">
      {selectedRows && selectedRows.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // @ts-ignore
          className="listing__page__grid__header"
        >
          <div className="listing__page__grid__header__checkbox">
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
          </div>
          <div className="listing__page__grid__header__actions">
            {actions.map((action) => (
              <button
                type="button"
                key={action.name}
                className={
                  "listing__page__table__actions__button" +
                  (action.danger ? " danger" : "")
                }
                onClick={async () => {
                  await action.onClick();
                  setSelectedRows([]);
                }}
              >
                {action.icon}
                {action.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      <div
        className={"listing__page__grid__content" + (isStale ? " stale" : "")}
      >
        {isFetchingData ? (
          <div className="listing__page__table__content__empty">
            <Loader />
          </div>
        ) : (
          children
        )}
      </div>
      <div className="listing__page__table__footer">
        <div className="listing__page__table__footer__stats">
          {selectedRows && (
            <div className="listing__page__table__footer__stats__entry">
              {selectedRows.length} Selected
            </div>
          )}
          <div className="listing__page__table__footer__stats__entry">
            {data.length} Entries
          </div>
        </div>
      </div>
    </div>
  );
}
