"use client";

// import CurrencyDisplay from "./CurrencyDisplay";
import PropertyDetailsEntry from "@/components/PropertyDetailsEntry";
import PropertyDetailsTabs from "@/components/PropertyDetailsTabs";
import PropertyDetailsTabsEntry from "@/components/PropertyDetailsTabsEntry";
import facilities from "@/data/facilities";
// import { propertyTaxPercentage } from "@/constants/constants";
import useQuery from "@/hooks/useQuery";
import useLanguage from "@/hooks/useLanguage";
import { useSearchParams } from "next/navigation";

interface PropertyDetailsClient2dProps {
  plot: string;
  block: string;
  area: string;
  orientation: { ar: string; en: string };
  purpose: { ar: string; en: string };
  unitType: { ar: string; en: string };
  roadWidths: string;
  mapLink: string;
  lengths: { south: string; north: string; east: string; west: string };
  nearByFacilitiesDistance: { [key: string]: string };
  unitPrice: number;
}

export default function PropertyDetailsClient2d() {
  const [lang] = useLanguage();

  const property = useSearchParams().get("property");

  const { data, isLoading } = useQuery<PropertyDetailsClient2dProps>(
    property ? `/api/property/2d/${property}` : null
  );

  return (
    <PropertyDetailsTabs
      tabs={[
        "Property",

        // "Financial",

        "Nearby"
      ]}
      tabsArabic={[
        "العقار",

        // "المالية",

        "القريبة"
      ]}
      isLoading={isLoading}
    >
      <PropertyDetailsTabsEntry>
        {data?.plot && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  width="20"
                  height="17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.893 16.196H2.185C.878 16.196 0 15.259 0 13.863V2.601C0 1.236.888.295 2.171.295h15.492c1.283 0 2.166.943 2.167 2.311V13.87c0 1.395-.879 2.327-2.19 2.327H9.892Zm.037-.895h7.622c.99 0 1.438-.478 1.438-1.537V2.712c0-1.039-.45-1.526-1.41-1.526H2.25c-.962 0-1.417.485-1.417 1.516v11.053c0 1.077.444 1.546 1.467 1.546h7.63Z"
                    fill="#B8AB9D"
                  />
                  <path
                    d="M10.263 11.688c0 .165.005.331 0 .497-.01.27-.143.445-.442.459-.3.013-.453-.17-.48-.429-.027-.273-.006-.551-.013-.828-.017-.814-.542-1.361-1.393-1.38a93.254 93.254 0 0 0-3.636 0c-.872.016-1.407.562-1.418 1.4-.005.261.014.524-.01.784-.025.278-.172.473-.496.45-.3-.02-.433-.204-.423-.474.015-.452-.014-.916.082-1.354.22-.983 1.086-1.65 2.136-1.667 1.242-.021 2.485-.017 3.727-.006 1.42.012 2.372.944 2.377 2.3-.01.083-.01.166-.011.248ZM6.083 8.242c-1.257-.007-2.319-1.033-2.3-2.226.02-1.223 1.052-2.185 2.34-2.178 1.288.007 2.319 1.007 2.3 2.215-.02 1.209-1.074 2.196-2.34 2.189Zm.011-.897c.766 0 1.386-.571 1.396-1.293.01-.723-.64-1.358-1.4-1.348-.76.01-1.375.615-1.374 1.33 0 .716.614 1.309 1.377 1.311h.001ZM14.45 5.591c-.866 0-1.731-.006-2.597.004-.351.004-.632-.093-.624-.46.007-.34.29-.438.614-.438h5.237c.318 0 .603.093.6.446 0 .375-.291.452-.634.45-.865-.007-1.731-.002-2.597-.002ZM14.45 8.244c.865 0 1.731.005 2.597 0 .34 0 .63.074.633.45 0 .352-.28.446-.6.446h-5.237c-.408 0-.657-.195-.618-.477.047-.344.3-.422.628-.419.866.007 1.731 0 2.597 0ZM14.397 12.651c-.85 0-1.7-.005-2.55 0-.326 0-.609-.074-.616-.42-.01-.375.284-.451.628-.45 1.728.006 3.457.006 5.186 0 .331 0 .64.05.635.439-.005.389-.318.43-.647.429-.879.002-1.758.002-2.636.002Z"
                    fill="#B8AB9D"
                  />
                </svg>
                {lang === "ar" ? " قطعة" : "Plot Number "}
              </>
            }
            value={data?.plot}
          />
        )}
        {data?.block && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  width="16"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.115 5.246v8c0 2.4-1.2 4-4 4h-6.4c-2.8 0-4-1.6-4-4v-8c0-2.4 1.2-4 4-4h6.4c2.8 0 4 1.6 4 4Z"
                    stroke="#B8AB9D"
                  />
                  <path
                    d="M9.914 3.246v1.6c0 .88.72 1.6 1.6 1.6h1.6M4.715 10.046h3.2M4.715 13.246h6.4"
                    stroke="#B8AB9D"
                  />
                </svg>
                {lang === "ar" ? " رقم القطعة" : "Block Number "}
              </>
            }
            value={data?.block}
          />
        )}
        {data?.area && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " المساحة" : "Area"}
              </>
            }
            value={data?.area}
          />
        )}
        {data?.orientation && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " عمود" : "Orientation "}
              </>
            }
            value={lang === "ar" ? data.orientation.ar : data.orientation.en}
          />
        )}
        {data?.purpose && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " الغرض" : "Purpose "}
              </>
            }
            value={lang === "ar" ? data.purpose.ar : data.purpose.en}
          />
        )}
        {data?.unitType && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " نوع الوحدة" : "Unit type "}
              </>
            }
            value={lang === "ar" ? data.unitType.ar : data.unitType.en}
          />
        )}
        {data?.roadWidths && (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " عمود" : "Road widths "}
              </>
            }
            value=""
          />
        )}
        {data?.mapLink ? (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? " عمود" : "Map link "}
              </>
            }
            value={data?.mapLink}
          />
        ) : null}
        {data?.lengths.south ? (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? "الجنوب" : "South"}
              </>
            }
            value={data?.lengths.south}
          />
        ) : null}
        {data?.lengths.north ? (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? "الشمال" : "North"}
              </>
            }
            value={data?.lengths.north}
          />
        ) : null}
        {data?.lengths.east ? (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? "الشرق" : "East"}
              </>
            }
            value={data?.lengths.east}
          />
        ) : null}
        {data?.lengths.west ? (
          <PropertyDetailsEntry
            label={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                {lang === "ar" ? "الغرب" : "West"}
              </>
            }
            value={data?.lengths.west}
          />
        ) : null}
      </PropertyDetailsTabsEntry>
      {/* <PropertyDetailsTabsEntry>
        {data?.unitPrice && (
          <PropertyDetailsEntry
            label={lang === "ar" ? " سعر العقار" : "Property price"}
            value={<CurrencyDisplay>{data?.unitPrice}</CurrencyDisplay>}
          />
        )}
        {data?.unitPrice && (
          <PropertyDetailsEntry
            label={lang === "ar" ? "رسوم التسجيل" : "Reservation Fee"}
            value={
              <CurrencyDisplay>
                {data?.unitPrice * propertyTaxPercentage}
              </CurrencyDisplay>
            }
          />
        )}
      </PropertyDetailsTabsEntry> */}
      <PropertyDetailsTabsEntry>
        {data?.nearByFacilitiesDistance &&
          Object.entries(data.nearByFacilitiesDistance)
            .filter(([, distance]) => distance)
            .map(([facility, distance]) => {
              const facilityData = facilities.find((f) => f.key === facility);
              return (
                <PropertyDetailsEntry
                  key={facility}
                  label={
                    <>
                      {facilityData?.icon}
                      {lang === "ar"
                        ? facilityData?.labelAr
                        : facilityData?.labelEn}{" "}
                    </>
                  }
                  value={`${distance} km`}
                />
              );
            })}
      </PropertyDetailsTabsEntry>
    </PropertyDetailsTabs>
  );
}
