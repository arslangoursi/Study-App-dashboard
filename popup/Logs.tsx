"use client";

import "@/styles/listing.scss";
import "@/styles/dashboardAdmin.scss";
import "@/styles/user.scss";

import DateRange from "@/components/DateRange";
import DeleteIcon from "@/icons/DeleteIcon";
import ExportIcon from "@/icons/ExportIcon";
import FilterLogsPopup from "@/components/FilterLogsPopup";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingDate from "@/components/ListingDate";
import ListingTable from "@/components/ListingTable";
import { UserLogs as data } from "@/constants/mocks";
import dayjs from "dayjs";
import exportToCSV from "@/utils/exportToCSV";
import headerItems from "@/data/headerItems.json";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

export default function Logs() {
  const [lang] = useLanguage();
  const [filterLogsPopup, setFilterLogsPopup] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, "month").toDate(),
    endDate: new Date()
  });

  const [sortData, setSortData] = useState<{
    key: string;
    order: "asc" | "desc";
  }>({
    key: "name",
    order: "asc"
  });

  const entryActions = [
    {
      name: "Export",
      onClick: () =>
        exportToCSV(
          data.filter((item) => selectedRows.includes(item.id)),
          "Customer"
        ),
      icon: <ExportIcon />
    },
    {
      name: "Delete",
      onClick: () => {},
      danger: true,
      icon: <DeleteIcon />
    }
  ];

  return (
    <>
      {filterLogsPopup && (
        <FilterLogsPopup onClose={() => setFilterLogsPopup(false)} />
      )}
      <div className="listing__page">
        <div className="listing__page__header listing__page__header__logs">
          <div className="listing__page__header__actions listing__page__header__actions__logs">
            <button
              type="button"
              onClick={() => setFilterLogsPopup(true)}
              className="listing__page__header__actions__icon__button"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 6H12.6667M1 1H15M5.66667 11H10.3333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="admin__chart__calender listing__page__header__logs__filter__entry">
              <div className="listing__page__header__logs__lable">
                {lang === "ar" ? "نطاق التاريخ:" : "Date Range:"}
              </div>
              <DateRange
                value={dateRange}
                onChange={(value) => setDateRange(value)}
                style={{ left: 0, overflow: "visible", right: "auto" }}
              />
            </div>
          </div>
        </div>
        <ListingTable
          headerItems={headerItems.userLogs}
          actions={entryActions}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          sortData={sortData}
          setSortData={setSortData}
          data={data}
          style={{ height: "calc(100% - 40px - 2.5em)" }}
        >
          {data.map((item) => (
            <div key={item.id} className="listing__page__table__content__row">
              <div className="listing__page__table__content__row__entry checkbox">
                <ListingCheckbox
                  checked={selectedRows.includes(item.id)}
                  onClick={() => {
                    if (selectedRows.includes(item.id)) {
                      setSelectedRows(
                        selectedRows.filter((row) => row !== item.id)
                      );
                    } else {
                      setSelectedRows([...selectedRows, item.id]);
                    }
                  }}
                />
              </div>
              <div className="listing__page__table__content__row__entry listing__page__table__content__row__entry__logs">
                {item.user.name} {item.description.en} (URL: {item.url})
              </div>
              <div className="listing__page__table__content__row__entry">
                <ListingDate date={item.createdAt} />
              </div>
            </div>
          ))}
        </ListingTable>
      </div>
    </>
  );
}
