import { useMemo } from "react";
import { IMap3dApartment } from "@/interfaces";
import { useTheme } from "next-themes";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState
} from "nuqs";
import ApartmentSvgUiDetails from "./ApartmentSvgUiDetails";
import ApartmentSvgUiList from "./ApartmentSvgUiList";
import ApartmentSvgUiGrid from "./ApartmentSvgUiGrid";
import ApartmentSvgUiFilters from "./ApartmentSvgUiFilters";
import dynamic from "next/dynamic";

const ApartmentSvgViewerThumbnail = dynamic(
  () => import("@/components/ApartmentSvgViewerThumbnail"),
  {
    ssr: false,
    loading: () => <div className="svg__based__selling__ui__loading" />
  }
);

enum ListingView {
  LIST = "list",
  GRID = "grid"
}
export default function ApartmentSvgUiSidebar({
  apartments,
  filters,
  setFilters,
  stills,
  selectableApartments,
  handlePropertySelection,
  propertyDetails
}: {
  apartments: IMap3dApartment[];
  filters: {
    towers: string[];
    floors: string[];
    bedrooms: string[];
    statuses: string[];
    prices: string[];
    area: number[];
  } | null;
  setFilters: (filters: any) => void;
  stills: { day: string | null; night: string | null }[];
  selectableApartments: Record<string, string>;
  handlePropertySelection: (propertyName: string) => void;
  propertyDetails: {
    id: string;
    entity: string;
    batch: string | null;
    area: string | null;
    unitPrice: number;
    images: string[];
    status: string;
    asset3dFiles: string[];
    link360: string;
  };
}) {
  const { theme } = useTheme();
  const [, setShowFilters] = useQueryState(
    "showFilters",
    parseAsBoolean.withDefault(false)
  );
  const [listingView, setListingView] = useQueryState(
    "listingView",
    parseAsString.withDefault(ListingView.LIST)
  );
  const [property, setProperty] = useQueryState("property");
  const [selectedStill, setSelectedStill] = useQueryState(
    "selectedStill",
    parseAsInteger.withDefault(0)
  );

  const selectableApartmentsData = useMemo(
    () =>
      apartments
        .map(({ id, details, status }) => ({
          id,
          entity: details.entity,
          details,
          status,
          color: selectableApartments[details.entity]
        }))
        .filter(({ color }) => color),
    [apartments, selectableApartments]
  );

  return (
    <div className="svg__based__selling__ui__sidebar">
      <div className="svg__based__selling__ui__sidebar__left">
        {property && (
          <ApartmentSvgUiDetails
            property={property}
            onClose={() => setProperty(null)}
            propertyDetails={propertyDetails}
          />
        )}
        <ApartmentSvgUiFilters
          apartments={apartments}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="svg__based__selling__ui__sidebar__left__listing">
          <div className="svg__based__selling__ui__sidebar__left__listing__header">
            <div className="svg__based__selling__ui__sidebar__left__listing__header__title">
              Select an apartment
            </div>
            <div className="svg__based__selling__ui__sidebar__left__listing__header__actions">
              <button onClick={() => setShowFilters(true)}>Show filters</button>
              <button
                onClick={() =>
                  setListingView(
                    listingView === ListingView.LIST
                      ? ListingView.GRID
                      : ListingView.LIST
                  )
                }
              >
                {listingView === ListingView.LIST ? (
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
                    className="feather feather-grid"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
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
            </div>
          </div>
          <div className="svg__based__selling__ui__sidebar__left__listing__content">
            {listingView === ListingView.LIST ? (
              <ApartmentSvgUiList
                data={selectableApartmentsData}
                onClick={handlePropertySelection}
              />
            ) : (
              <ApartmentSvgUiGrid
                data={selectableApartmentsData}
                onClick={handlePropertySelection}
              />
            )}
          </div>
        </div>
      </div>
      <div className="svg__based__selling__ui__sidebar__right">
        {stills.map(({ day, night }, index) => (
          <ApartmentSvgViewerThumbnail
            key={index}
            isActive={selectedStill === index}
            onClick={() => setSelectedStill(index)}
            svgCode={theme === "dark" ? night : day}
            selectableApartments={selectableApartments}
          />
        ))}
      </div>
    </div>
  );
}
