"use client";

// import CurrencyDisplay from "./CurrencyDisplay";
import PropertyDetailsEntry from "@/components/PropertyDetailsEntry";
import PropertyDetailsTabs from "@/components/PropertyDetailsTabs";
import PropertyDetailsTabsEntry from "@/components/PropertyDetailsTabsEntry";
// import { propertyTaxPercentage } from "@/constants/constants";
import useQuery from "@/hooks/useQuery";
import useLanguage from "@/hooks/useLanguage";
import { useSearchParams } from "next/navigation";

export default function PropertyDetailsClient3d() {
  const [lang] = useLanguage();

  const property = useSearchParams().get("property");

  const { data, isLoading } = useQuery<{
    floor: string;
    unit: string;
    area: string;
    unitType: { ar: string; en: string };
    numberOfBalconies: string;
    numberOfBathrooms: string;
    numberOfBedrooms: string;
    numberOfGardens: string;
    numberOfParking: string;
    roofArea: string;
    parkingArea: string;
    unitShareOfCommonArea: string;
    unitShareOfLand: string;
    tower: string;
    unitPrice: number;
  }>(property ? `/api/property/3d/${property}` : null);

  return (
    <PropertyDetailsTabs
      tabs={[
        "Property"

        // "Financial"
      ]}
      tabsArabic={[
        "العقار"

        // "المالية"
      ]}
      isLoading={isLoading}
    >
      <PropertyDetailsTabsEntry>
        <PropertyDetailsEntry
          label={lang === "ar" ? "الطابق" : "Floor"}
          value={data?.floor || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "رقم الوحدة" : "Unit Number"}
          value={data?.unit || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "المساحة" : "Area"}
          value={data?.area || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "نوع الوحدة" : "Unit Type"}
          value={lang === "ar" ? data?.unitType?.ar : data?.unitType?.en}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "عدد الشرفات" : "Number of Balconies"}
          value={data?.numberOfBalconies || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "عدد الحمامات" : "Number of Bathrooms"}
          value={data?.numberOfBathrooms || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "عدد غرف النوم" : "Number of Bedrooms"}
          value={data?.numberOfBedrooms || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "عدد الحدائق" : "Number of Gardens"}
          value={data?.numberOfGardens || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "عدد مواقف السيارات" : "Number of Parking"}
          value={data?.numberOfParking || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "مساحة السطح" : "Roof Area"}
          value={data?.roofArea || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "مساحة مواقف السيارات" : "Parking Area"}
          value={data?.parkingArea || "N/A"}
        />
        <PropertyDetailsEntry
          label={
            lang === "ar"
              ? "حصة الوحدة من المساحة المشتركة"
              : "Unit Share of Common Area"
          }
          value={data?.unitShareOfCommonArea || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "حصة الوحدة من الأرض" : "Unit Share of Land"}
          value={data?.unitShareOfLand || "N/A"}
        />
        <PropertyDetailsEntry
          label={lang === "ar" ? "البرج" : "Tower"}
          value={data?.tower || "N/A"}
        />
      </PropertyDetailsTabsEntry>
      {/* <PropertyDetailsTabsEntry>
        {data?.unitPrice && (
          <PropertyDetailsEntry
            label={lang === "ar" ? "سعر العقار" : "Property Price"}
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
      <></>
    </PropertyDetailsTabs>
  );
}
