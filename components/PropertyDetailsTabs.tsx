"use client";

import { ReactElement, useState } from "react";

import useLanguage from "@/hooks/useLanguage";
import Loader from "./Loader";

export default function PropertyDetailsTabs({
  children,
  tabs,
  tabsArabic,
  isLoading = false
}: {
  children: Array<ReactElement<{ id: string }>>;
  tabs: string[];
  tabsArabic: string[];
  isLoading?: boolean;
}) {
  const [lang] = useLanguage();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className="map__overlay__detail__modal__body__tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`map__overlay__detail__modal__body__tabs__tab ${
              selectedTab === index ? "active" : ""
            }`}
          >
            {lang === "ar" ? tabsArabic[index] : tab}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Loader />
        </div>
      ) : (
        children
          .filter((_, index) => index === selectedTab)
          .map((child, index) => (
            <div
              key={index}
              className={`map__overlay__detail__modal__body__content ${
                selectedTab === index ? "active" : ""
              }`}
            >
              {child}
            </div>
          ))
      )}
    </>
  );
}
