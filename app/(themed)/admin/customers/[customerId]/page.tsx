"use client";

import "@/styles/user.scss";
import "@/styles/listing.scss";

import CustomerPopup from "@/popup/CustomerPopup";
import Filters from "@/components/Filters";
import { ICustomerDetail } from "@/interfaces";
import InputDateRange from "@/components/InputDateRange";
import ListingAnalytics from "@/components/ListingAnalytics";
import ListingAnalyticsCard from "@/components/ListingAnalyticsCard";
import ListingTabs from "@/components/ListingTabs";
import Loader from "@/components/Loader";
import Reminders from "@/components/Reminders";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import StartIcon from "@/icons/StartIcon";
import UserDetailEntryCustomer from "@/components/UserDetailEntryCustomer";
import { customersPlots as data } from "@/constants/mocks"; // Mock Data
import { useState } from "react";

const navigationTabs = [
  {
    icon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.06283 0.619141H9.0752C9.47466 0.619141 9.85776 0.777827 10.1402 1.06029C10.4227 1.34276 10.5814 1.72586 10.5814 2.12533V3.63151H13.5937C13.9932 3.63151 14.3763 3.7902 14.6588 4.07266C14.9412 4.35513 15.0999 4.73823 15.0999 5.1377V13.4217C15.0999 13.8212 14.9412 14.2043 14.6588 14.4867C14.3763 14.7692 13.9932 14.9279 13.5937 14.9279H1.54427C1.14481 14.9279 0.761702 14.7692 0.479237 14.4867C0.196773 14.2043 0.0380859 13.8212 0.0380859 13.4217V5.1377C0.0380859 4.30176 0.708338 3.63151 1.54427 3.63151H4.55664V2.12533C4.55664 1.28939 5.22689 0.619141 6.06283 0.619141ZM9.0752 3.63151V2.12533H6.06283V3.63151H9.0752Z"
          fill="currentColor"
        />
      </svg>
    ),
    name: "Customer Info"
  },
  {
    icon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.06283 0.619141H9.0752C9.47466 0.619141 9.85776 0.777827 10.1402 1.06029C10.4227 1.34276 10.5814 1.72586 10.5814 2.12533V3.63151H13.5937C13.9932 3.63151 14.3763 3.7902 14.6588 4.07266C14.9412 4.35513 15.0999 4.73823 15.0999 5.1377V13.4217C15.0999 13.8212 14.9412 14.2043 14.6588 14.4867C14.3763 14.7692 13.9932 14.9279 13.5937 14.9279H1.54427C1.14481 14.9279 0.761702 14.7692 0.479237 14.4867C0.196773 14.2043 0.0380859 13.8212 0.0380859 13.4217V5.1377C0.0380859 4.30176 0.708338 3.63151 1.54427 3.63151H4.55664V2.12533C4.55664 1.28939 5.22689 0.619141 6.06283 0.619141ZM9.0752 3.63151V2.12533H6.06283V3.63151H9.0752Z"
          fill="currentColor"
        />
      </svg>
    ),
    name: "Change Password"
  }
];

export default function CustomerDetails() {
  const [selectedNavigationTab, setSelectedNavigationTab] =
    useState("customer info");
  // Mock data

  return (
    <div className="dashboard__user__upper">
      <div className="dashboard__user__upper__info">
        <img
          loading="lazy"
          src="/userbg.webp"
          alt="Background"
          className="dashboard__user__upper__info__img"
        />
        <div className="dashboard__user__upper__info__profile">
          <div className="dashboard__user__upper__info__profile__text">
            <div className="dashboard__user__upper__info__profile__name">
              Name
            </div>
            <div className="dashboard__user__upper__info__profile__role">
              Status
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__user__upper__navigation">
        <div className="dashboard__user__upper__navigation__entries">
          {navigationTabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              className={
                selectedNavigationTab === tab.name.toLowerCase()
                  ? "dashboard__user__upper__navigation__entry__active"
                  : "dashboard__user__upper__navigation__entry"
              }
              onClick={() => setSelectedNavigationTab(tab.name.toLowerCase())}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
