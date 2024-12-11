"use client";

import "@/styles/listing.scss";
import "@/styles/login.scss";
import "@/styles/user.scss";

import { parseAsString, useQueryState } from "nuqs";
import { useMemo, useState } from "react";

import CurrencyDisplay from "@/components/CurrencyDisplay";
import DeleteIcon from "@/icons/DeleteIcon";
import ExportIcon from "@/icons/ExportIcon";
import Filters from "@/components/Filters";
import { ICustomers } from "@/interfaces";
import InputDateRange from "@/components/InputDateRange";
import Link from "next/link";
import ListingAnalytics from "@/components/ListingAnalytics";
import ListingAnalyticsCard from "@/components/ListingAnalyticsCard";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingDate from "@/components/ListingDate";
import ListingStatus from "@/components/ListingStatus";
import ListingTable from "@/components/ListingTable";
import ListingTabs from "@/components/ListingTabs";
import ListingTags from "@/components/ListingTags";
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import axios from "axios";
import dayjs from "dayjs";
import exportToCSV from "@/utils/exportToCSV";
import useGenerateTabs from "@/hooks/useGenerateTabs";
import headerItems from "@/data/headerItems.json";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";
import useTable from "@/hooks/useTable";

export default function Customers() {
  const [lang] = useLanguage();
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useQueryState(
    "tab",
    parseAsString.withDefault("all")
  );

  const {
    data,
    isLoading,
    sortData,
    setSortData,
    search,
    setSearch,
    resetAll,
    refetch
  } = useTable<ICustomers>({ path: "/api/customers" });

  const tabs = useGenerateTabs(data, ["active", "inactive"]);

  const updatedByUnique = useMemo(() => {
    return [...Array.from(new Set(data.map((item) => item.lastUpdatedBy)))]
      .map((item) => ({ label: item, value: item }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  const tagsUnique = useMemo(() => {
    return [
      ...Array.from(new Set(data.flatMap((item) => item.tags || [])))
    ].map((item) => ({ label: item, value: item }));
  }, [data]);

  const typesUnique = useMemo(() => {
    return [...Array.from(new Set(data.map((item) => item.type || "")))].map(
      (item) => ({ label: item, value: item })
    );
  }, [data]);

  const [filters, setFilters] = useState<{
    type: { label: string; value: string }[];
    tags: { label: string; value: string }[];
    updatedBy: { label: string; value: string }[];
    updatedDate: { startDate: Date; endDate: Date } | null;
  }>({
    type: [],
    tags: [],
    updatedBy: [],
    updatedDate: null
  });

  const onReset = () => {
    setFilters({
      type: [],
      tags: [],
      updatedBy: [],
      updatedDate: null
    });
    resetAll();
    setSelectedTab("all");
  };

  const filteredData = data
    .filter((item) => {
      if (
        filters.type.length > 0 &&
        !filters.type.some(({ value }) => value === item.type)
      )
        return false;
      if (
        filters.tags.length > 0 &&
        !filters.tags.some(({ value }) => item.tags?.includes(value))
      )
        return false;
      if (
        filters.updatedBy.length > 0 &&
        !filters.updatedBy.some(({ value }) => value === item.lastUpdatedBy)
      )
        return false;
      if (
        filters.updatedDate &&
        (!dayjs(item.lastUpdatedDate).isAfter(filters.updatedDate.startDate) ||
          !dayjs(item.lastUpdatedDate).isBefore(filters.updatedDate.endDate))
      )
        return false;

      return true;
    })
    .filter((item) => {
      if (selectedTab === "all") return true;
      return item.status.toLowerCase() === selectedTab.toLowerCase();
    });

  const [isDeleting, handleDelete] = useAction({
    promise: () =>
      axios.delete("/api/customers", { data: { ids: selectedRows } }),
    successMessage:
      lang === "ar" ? "تم حذف العملاء بنجاح" : "Customers deleted successfully",
    onSuccess: refetch,
    needsConfirmation: true
  });

  const entryActions = [
    {
      name: "Export",
      onClick: () =>
        exportToCSV(
          filteredData.filter((item) => selectedRows.includes(item.id)),
          "Customer"
        ),
      icon: <ExportIcon />
    },
    {
      name: "Delete",
      onClick: handleDelete,
      danger: true,
      disabled: isDeleting,
      icon: isDeleting ? <Loader small color="var(--blue)" /> : <DeleteIcon />
    }
  ];

  return (
    <>
      <div className="listing__page">
        <ListingAnalytics>
          <ListingAnalyticsCard
            icon={
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.97928 13.4846C8.05069 13.4846 7.1213 13.4846 6.18952 13.4846C4.95486 13.4806 4.20402 12.7329 4.20163 11.5078C4.20163 10.7251 4.18648 9.94158 4.20721 9.15886C4.2375 7.97361 4.71574 6.98684 5.57498 6.17223C5.74316 6.01282 5.82845 6.03832 5.98308 6.18897C7.75418 7.91304 10.2386 7.91702 11.9938 6.18897C12.1755 6.01043 12.2656 6.02956 12.4314 6.18897C13.2954 7.02032 13.7633 8.02223 13.78 9.22581C13.7904 10.0085 13.7848 10.7913 13.78 11.574C13.7745 12.6979 13.0149 13.4654 11.8806 13.4782C10.917 13.4933 9.94772 13.4846 8.97928 13.4846Z"
                  fill="var(--golden)"
                />
                <path
                  d="M11.991 3.33132C11.9487 4.98365 10.577 6.32433 8.96688 6.28766C7.29303 6.24861 5.95873 4.86967 6.00098 3.23567C6.04163 1.63515 7.2747 0.29448 9.02825 0.286509C10.6766 0.270567 12.0324 1.70131 11.991 3.33132Z"
                  fill="var(--golden)"
                />
                <path
                  d="M16.4853 4.19225C16.4853 5.33764 15.5153 6.29971 14.3763 6.28935C13.2373 6.27899 12.2696 5.30815 12.2784 4.17312C12.2806 3.61525 12.5043 3.0811 12.9004 2.68819C13.2964 2.29529 13.8323 2.0758 14.3902 2.07802C14.9481 2.08024 15.4822 2.30398 15.8751 2.70003C16.2681 3.09608 16.4875 3.63199 16.4853 4.18986V4.19225Z"
                  fill="var(--golden)"
                />
                <path
                  d="M1.50488 4.1747C1.51732 3.62373 1.74541 3.09964 2.14013 2.71504C2.53485 2.33045 3.06469 2.11605 3.61579 2.11793C4.16689 2.11981 4.69526 2.33782 5.08735 2.72509C5.47944 3.11237 5.70394 3.63801 5.71263 4.18904C5.70625 5.33045 4.73462 6.29491 3.59799 6.28614C3.04203 6.27863 2.51124 6.05319 2.11979 5.65832C1.72835 5.26345 1.50755 4.7307 1.50488 4.1747Z"
                  fill="var(--golden)"
                />
                <path
                  d="M14.9795 9.8322C15.0018 9.11484 14.9795 8.40146 14.7403 7.71358C14.675 7.52548 14.7148 7.45533 14.9388 7.41867C15.735 7.30174 16.454 6.87844 16.9426 6.239C17.1021 6.03097 17.1945 6.02618 17.3468 6.239C17.6615 6.64975 17.8664 7.13392 17.9422 7.64583C18.0068 8.21264 18.0177 8.78429 17.9749 9.35316C17.9191 10.3208 17.224 10.9991 16.2683 11.0788C14.9811 11.1872 14.9811 11.1872 14.9811 9.9135L14.9795 9.8322Z"
                  fill="var(--golden)"
                />
                <path
                  d="M0.00682311 8.53299C-0.0322334 7.78295 0.08653 6.97631 0.620568 6.26692C0.80788 6.02142 0.897948 6.04374 1.0757 6.26692C1.58024 6.90458 2.25456 7.28 3.05323 7.42028C3.22061 7.44977 3.33619 7.45615 3.26047 7.67136C2.91295 8.66052 3.02135 9.68795 3.02135 10.7042C3.02135 11.0015 2.94164 11.1115 2.64194 11.0836C2.39246 11.0605 2.13819 11.0836 1.88632 11.078C0.794329 11.0573 0.045082 10.32 0.0100109 9.22963C0.00124307 9.03356 0.00682311 8.83429 0.00682311 8.53299Z"
                  fill="var(--golden)"
                />
              </svg>
            }
            title={lang === "ar" ? "إجمالي عدد العملاء" : "Total Customers"}
            value={data?.length}
            color="var(--goldenLight)"
          />
        </ListingAnalytics>
        <div className="listing__page__header">
          <ListingTabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="listing__page__header__actions">
            <SearchInput value={search} onChange={setSearch} />
            <Filters onReset={onReset}>
              <Select
                label={lang === "ar" ? "النوع" : "Type"}
                options={typesUnique}
                isMulti
                value={filters.type}
                onChange={(value) => setFilters({ ...filters, type: value })}
              />
              <Select
                label={lang === "ar" ? "العلامات" : "Tags"}
                options={tagsUnique}
                isMulti
                value={filters.tags}
                onChange={(value) => setFilters({ ...filters, tags: value })}
              />
              <Select
                label={lang === "ar" ? "تم التحديث بواسطة" : "Updated By"}
                options={updatedByUnique}
                isMulti
                value={filters.updatedBy}
                onChange={(value) =>
                  setFilters({ ...filters, updatedBy: value })
                }
              />
              <InputDateRange
                label={lang === "ar" ? "تاريخ التحديث" : "Last Updated Date"}
                value={filters.updatedDate}
                onChange={(value) =>
                  setFilters({ ...filters, updatedDate: value })
                }
              />
            </Filters>
            <Link
              href={pathname + "/create"}
              className="listing__page__header__actions__button"
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
              {lang === "ar" ? "إنشاء عميل" : "Create Customer"}
            </Link>
          </div>
        </div>
        <ListingTable
          headerItems={headerItems.customers}
          actions={entryActions}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          sortData={sortData}
          setSortData={setSortData}
          data={filteredData}
          isFetchingData={isLoading}
        >
          {filteredData.map((item) => (
            <Link
              href={pathname + "/" + item.id}
              key={item.id}
              className="listing__page__table__content__row"
            >
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
              <div className="listing__page__table__content__row__entry">
                {item.picture && (
                  <img
                    loading="lazy"
                    src={item.picture}
                    alt={item.name}
                    className="listing__page__table__content__row__entry__img"
                  />
                )}
                {item.name}
              </div>
              <div
                style={{ width: 300 }}
                className="listing__page__table__content__row__entry"
              >
                {item.email}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.phone}
              </div>
              <div className="listing__page__table__content__row__entry">
                {item.type}
              </div>
              <ListingTags tags={item.tags} />
              <div className="listing__page__table__content__row__entry">
                <CurrencyDisplay>{item.spent}</CurrencyDisplay>
              </div>
              <div className="listing__page__table__content__row__entry">
                <CurrencyDisplay>{item.bought}</CurrencyDisplay>
              </div>
              <ListingStatus value={item.status} />
              <div className="listing__page__table__content__row__entry">
                {item.lastUpdatedBy}
              </div>

              <ListingDate date={item.lastUpdatedDate} />
            </Link>
          ))}
        </ListingTable>
      </div>
    </>
  );
}
