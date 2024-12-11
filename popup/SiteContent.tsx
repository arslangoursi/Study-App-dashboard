"use client";

import { useMemo, useState } from "react";

import DeleteIcon from "@/icons/DeleteIcon";
import ExportIcon from "@/icons/ExportIcon";
import Filters from "@/components/Filters";
import InputDateRange from "@/components/InputDateRange";
import ListingCheckbox from "@/components/ListingCheckbox";
import ListingDate from "@/components/ListingDate";
import ListingTable from "@/components/ListingTable";
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
import axios from "axios";
import dayjs from "dayjs";
import exportToCSV from "@/utils/exportToCSV";
import headerItems from "@/data/headerItems.json";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import useTable from "@/hooks/useTable";
import ListingAnalytics from "@/components/ListingAnalytics";
import ListingAnalyticsCard from "@/components/ListingAnalyticsCard";
import numberDisplay from "@/utils/numberDisplay";
import { IPopup, ISiteContent } from "@/interfaces";
import Popup from "@/components/Popup";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import InputFile from "@/components/InputFile";
import PictureInput from "@/components/PictureInput";
import uploadFile from "@/utils/uploadFile";
import getCookieClient from "@/utils/getCookieClient";
import decodeJwt from "@/utils/decodeJwt";
import ListingStatus from "@/components/ListingStatus";

export default function SiteContent() {
  const [lang] = useLanguage();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const {
    data,
    isLoading,
    sortData,
    setSortData,
    search,
    setSearch,
    resetAll,
    refetch,
    total
  } = useTable<ISiteContent>({ path: "/api/siteContentProjects" });

  const actionByUnique = useMemo(() => {
    return [
      ...Array.from(
        new Set(data.map((item) => item.actionBy.name || "Unknown"))
      )
    ]
      .map((item) => ({ label: item, value: item }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  const [filters, setFilters] = useState<{
    actionBy: { label: string; value: string }[];
    updatedAt: { startDate: Date; endDate: Date } | null;
  }>({
    actionBy: [],
    updatedAt: null
  });

  const onReset = () => {
    setFilters({
      actionBy: [],
      updatedAt: null
    });
    resetAll();
  };

  const filteredData = data.filter((item) => {
    if (
      filters.actionBy.length > 0 &&
      !filters.actionBy.some((filter) => filter.value === item.actionBy.name)
    )
      return false;
    if (filters.updatedAt) {
      if (
        dayjs(item.updatedAt).isBefore(filters.updatedAt.startDate) ||
        dayjs(item.updatedAt).isAfter(filters.updatedAt.endDate)
      )
        return false;
    }

    return true;
  });

  const [isDeleting, handleDelete] = useAction({
    promise: () =>
      axios.delete("/api/siteContentProjects", { data: { ids: selectedRows } }),
    successMessage:
      lang === "ar" ? "تم حذف المشاريع بنجاح" : "Projects deleted successfully",
    onSuccess: refetch,
    needsConfirmation: true
  });

  const entryActions = [
    {
      name: "Export",
      onClick: () =>
        exportToCSV(
          filteredData.filter((item) => selectedRows.includes(item.id)),
          "projects"
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

  const [isPageOpen, setIsPageOpen] = useState(false);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const [, handleSiteContent] = useAction({
    promise: async (value) => {
      const data = value.data;

      const token = getCookieClient("token") || "";

      const userId = decodeJwt(token).id;

      const [slides, logoEn, logoAr, banner, picture] = await Promise.all([
        Promise.all(data.slides.map(uploadFile)),
        data.logoEn && uploadFile(data.logoEn),
        data.logoAr && uploadFile(data.logoAr),
        data.banner && uploadFile(data.banner),
        data.picture && uploadFile(data.picture)
      ]);

      return axios.post("/api/siteContentProjects", {
        ...data,
        visible: data.visible?.value ?? null,
        status: data.status?.value ?? null,
        slides,
        logoEn,
        logoAr,
        banner,
        picture,
        actionById: userId
      });
    },
    successMessage:
      lang === "ar" ? "تم إضافة المشروع بنجاح" : "Project added successfully",
    onSuccess: refetch
  });

  return (
    <>
      <button
        className="listing__page__header__actions__button"
        onClick={() => setIsPageOpen(true)}
      >
        {lang === "ar" ? "محتوى الموقع" : "Site Content"}
      </button>
      {isPageOpen && (
        <>
          <div className="listing__page__popup">
            <div className="listing__page">
              <div
                style={{
                  position: "absolute",
                  top: "1em",
                  left: "1em",
                  padding: "1.5em",
                  fontSize: "1.2em",
                  fontWeight: "bold"
                }}
              >
                {lang === "ar" ? "محتوى الموقع" : "Site Content"}
              </div>
              <div className="listing__page__button__warper">
                <button
                  type="button"
                  onClick={() => setIsPageOpen(false)}
                  className="popup__close__use__icon"
                >
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
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.1934 11.8666C19.1882 11.2517 19.1831 10.6358 19.1831 10.0198C19.1831 9.35877 19.1886 8.69826 19.1941 8.03888V8.03881V8.03874C19.2045 6.78911 19.2149 5.54351 19.1877 4.30581C19.1185 1.82005 17.9425 0.644046 15.4752 0.616376C11.8011 0.570258 8.12863 0.570258 4.45764 0.616376C2.01338 0.639435 0.832767 1.84772 0.800484 4.32887C0.760516 7.99986 0.760516 11.6708 0.800484 15.3418C0.828155 17.6939 1.99493 18.9436 4.27777 18.9852C8.10249 19.0497 11.9287 19.0497 15.7565 18.9852C17.9425 18.9483 19.1139 17.7261 19.1831 15.5263C19.2138 14.316 19.2036 13.0933 19.1934 11.8666ZM15.4882 13.2204V9.0975C15.4882 8.63979 15.4895 8.18207 15.4907 7.72424V7.72386V7.72349C15.4936 6.65465 15.4965 5.58514 15.4836 4.51337C15.4836 3.90923 15.2254 3.43421 14.5613 3.44805C13.8972 3.46188 13.6758 3.95996 13.6758 4.55027V13.2573C13.6758 13.8615 13.934 14.3365 14.5981 14.3227C15.2622 14.3088 15.4882 13.8108 15.4882 13.2204ZM6.28724 8.10591V11.3342C6.28724 11.9199 6.10738 12.4364 5.46173 12.5009C4.81608 12.5655 4.48403 12.1043 4.47941 11.5048V4.40264C4.47191 4.28873 4.48698 4.17446 4.52375 4.06639C4.56052 3.95832 4.61826 3.85856 4.69368 3.77286C4.76909 3.68716 4.86069 3.61721 4.96321 3.567C5.06573 3.51679 5.17716 3.48732 5.29109 3.48028C5.95519 3.42955 6.25957 3.87228 6.27341 4.47643C6.29186 5.29116 6.28571 6.10589 6.27956 6.92062V6.92067C6.27648 7.32805 6.27341 7.73542 6.27341 8.1428L6.28724 8.10591ZM10.8665 8.68465C10.7905 8.18645 10.7152 7.69291 10.8799 7.36349C10.8799 6.96559 10.8816 6.5947 10.8832 6.24158C10.8862 5.58379 10.8889 4.98766 10.8799 4.39349C10.8965 4.16149 10.8212 3.93226 10.6702 3.75536C10.5191 3.57845 10.3046 3.46807 10.0728 3.44806C9.40874 3.38811 9.10898 3.83085 9.08592 4.435C8.99595 5.34746 8.99595 6.26655 9.08592 7.17901C9.14666 7.54494 9.09219 8.00705 9.03773 8.46901C8.91856 9.48 8.79946 10.4903 9.88836 10.4903C11.1424 10.4933 11.0033 9.5814 10.8665 8.68465Z"
                        fill="var(--golden)"
                      />
                    </svg>
                  }
                  title={lang === "ar" ? "إجمالي المشاريع" : "Total Projects"}
                  value={total}
                  color="var(--goldenLight)"
                />
              </ListingAnalytics>
              <div className="listing__page__header">
                <div />
                <div className="listing__page__header__actions">
                  <SearchInput value={search} onChange={setSearch} />
                  <Filters onReset={onReset}>
                    <Select
                      label={lang === "ar" ? "تم التحديث بواسطة" : "Updated By"}
                      options={actionByUnique}
                      isMulti
                      value={filters.actionBy}
                      onChange={(value) =>
                        setFilters({ ...filters, actionBy: value })
                      }
                    />
                    <InputDateRange
                      label={
                        lang === "ar" ? "تاريخ التحديث" : "Last Updated Date"
                      }
                      value={filters.updatedAt}
                      onChange={(value) =>
                        setFilters({ ...filters, updatedAt: value })
                      }
                    />
                  </Filters>
                  <button
                    type="button"
                    onClick={() => setIsCreatePopupOpen(true)}
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
                    {lang === "ar" ? "إنشاء مشروع" : "Create Project"}
                  </button>
                </div>
              </div>
              <ListingTable
                headerItems={headerItems.siteContentProject}
                actions={entryActions}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                sortData={sortData}
                setSortData={setSortData}
                data={filteredData}
                isFetchingData={isLoading}
                isStale={isDeleting}
              >
                {filteredData.map((item) => (
                  <SiteContentProjectEntry
                    key={item.id}
                    item={item}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    refresh={refetch}
                  />
                ))}
              </ListingTable>
            </div>
          </div>
          {isCreatePopupOpen && (
            <SiteContentProject
              onClose={() => setIsCreatePopupOpen(false)}
              onSubmit={handleSiteContent}
            />
          )}
        </>
      )}
    </>
  );
}

const initialDataStatic = {
  name: {
    ar: "",
    en: ""
  },
  city: {
    ar: "",
    en: ""
  },
  area: 0,
  status: {
    label: "",
    value: ""
  },
  visible: {
    label: "",
    value: false
  },
  description: {
    ar: "",
    en: ""
  },
  numberOfEntity: 0,
  nameOfEntity: {
    ar: "",
    en: ""
  },
  logoEn: null as File | null | string,
  logoAr: null as File | null | string,
  banner: null as File | null | string,
  picture: null as File | null | string,
  slides: null as string[] | string | File[] | File | null
};

function SiteContentProject({
  onClose,
  onSubmit,
  isEdit = false,
  initialData = initialDataStatic
}: IPopup<typeof initialDataStatic>) {
  const [lang] = useLanguage();
  const [data, setData] = useState(initialData);

  const onDiscard = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Popup
      title={
        isEdit
          ? lang === "ar"
            ? "تعديل مشروع المحتوى"
            : "Edit Content Project"
          : lang === "ar"
            ? "إضافة مشروع المحتوى"
            : "Add Content Project"
      }
      onSubmit={async () => await onSubmit({ data, isEdit })}
      onDiscard={onDiscard}
      onClose={onClose}
      isLarge={true}
    >
      <div className="create__user__section__row">
        <PictureInput
          label={lang === "ar" ? " صورة المشروع" : "Logo"}
          value={data.logoEn}
          onChange={(e) => setData({ ...data, logoEn: e })}
        />
        <PictureInput
          label={lang === "ar" ? " صورة البانر" : "Logo Arabic"}
          value={data.logoAr}
          onChange={(e) => setData({ ...data, logoAr: e })}
        />
        <PictureInput
          label={lang === "ar" ? " صورة البانر" : "Upload Banner"}
          value={data.banner}
          onChange={(e) => setData({ ...data, banner: e })}
        />
        <PictureInput
          label={lang === "ar" ? " صورة البانر" : "Upload Picture"}
          value={data.picture}
          onChange={(e) => setData({ ...data, picture: e })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "الاسم" : "Name"}
          id="name"
          value={data.name.en}
          onChange={(e) =>
            setData({ ...data, name: { ...data.name, en: e.target.value } })
          }
        />
        <Input
          style={{ direction: "rtl" }}
          label={lang === "ar" ? "الاسم بالعربي" : "Name Ar"}
          id="nameAr"
          value={data.name.ar}
          onChange={(e) =>
            setData({ ...data, name: { ...data.name, ar: e.target.value } })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "المدينة" : "City"}
          id="city"
          value={data.city.en}
          onChange={(e) =>
            setData({ ...data, city: { ...data.city, en: e.target.value } })
          }
        />
        <Input
          style={{ direction: "rtl" }}
          label={lang === "ar" ? "المدينة بالعربي" : "City Ar"}
          id="cityAr"
          value={data.city.ar}
          onChange={(e) =>
            setData({ ...data, city: { ...data.city, ar: e.target.value } })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? " المساحة" : "Area"}
          id="area"
          value={data.area + ""}
          onChange={(e) => setData({ ...data, area: Number(e.target.value) })}
        />
      </div>
      <div className="create__user__section__row">
        <Select
          label={lang === "ar" ? "الحالة" : "Status"}
          options={[
            { label: lang === "ar" ? "للبيع" : "On Sale", value: "ON_SALE" },
            {
              label: lang === "ar" ? "تم البيع" : "Sold Out",
              value: "SOLD_OUT"
            },
            {
              label: lang === "ar" ? "قريبا" : "Coming Soon",
              value: "COMING_SOON"
            }
          ]}
          value={data.status}
          onChange={(value) => setData({ ...data, status: value })}
        />
      </div>
      <div className="create__user__section__row">
        <Select
          label={lang === "ar" ? " التفعيل" : "Visible"}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          value={data.visible}
          onChange={(value) => setData({ ...data, visible: value })}
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? " عدد الكلمات" : "Number Of Entity"}
          id="numberOfEntity"
          value={data.numberOfEntity + ""}
          onChange={(e) =>
            setData({ ...data, numberOfEntity: Number(e.target.value) })
          }
        />
      </div>
      <div className="create__user__section__row">
        <Input
          label={lang === "ar" ? "اسم الكلمة" : "Name Of Entity"}
          id="nameOfEntity"
          value={data.nameOfEntity.en}
          onChange={(e) =>
            setData({
              ...data,
              nameOfEntity: { ...data.nameOfEntity, en: e.target.value }
            })
          }
        />
        <Input
          style={{ direction: "rtl" }}
          label={lang === "ar" ? "اسم الكلمة بالعربي " : "Name Of Entity Ar"}
          id="nameOfEntityAr"
          value={data.nameOfEntity.ar}
          onChange={(e) =>
            setData({
              ...data,
              nameOfEntity: { ...data.nameOfEntity, ar: e.target.value }
            })
          }
        />
      </div>
      <div className="create__user__section__row">
        <InputFile
          multiple
          label={lang === "ar" ? "الشرائح" : "Slides"}
          id="slides"
          value={data.slides}
          onChange={(e) => setData({ ...data, slides: e })}
        />
      </div>
      <div className="create__user__section__row">
        <TextArea
          label={lang === "ar" ? "الوصف" : "Description"}
          id="description"
          type="text"
          value={data.description.en}
          onChange={(e) => {
            setData({
              ...data,
              description: { ...data.description, en: e.target.value }
            });
          }}
        />
        <TextArea
          style={{ direction: "rtl" }}
          label={lang === "ar" ? "الوصف" : "Description Ar"}
          id="description"
          type="text"
          value={data.description.ar}
          onChange={(e) => {
            setData({
              ...data,
              description: { ...data.description, ar: e.target.value }
            });
          }}
        />
      </div>
    </Popup>
  );
}

function SiteContentProjectEntry({
  item,
  selectedRows,
  setSelectedRows,
  refresh
}: {
  item: ISiteContent;
  selectedRows: string[];
  setSelectedRows: (value: string[]) => void;
  refresh: () => void;
}) {
  const [lang] = useLanguage();
  const router = useRouter();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [, handleSiteContent] = useAction({
    promise: async (value) => {
      const data = value.data;

      const token = getCookieClient("token") || "";

      const userId = decodeJwt(token).id;

      const [slides, logoEn, logoAr, banner, picture] = await Promise.all([
        Promise.all(data.slides.map(uploadFile)),
        data.logoEn && uploadFile(data.logoEn),
        data.logoAr && uploadFile(data.logoAr),
        data.banner && uploadFile(data.banner),
        data.picture && uploadFile(data.picture)
      ]);

      return axios.put("/api/siteContentProjects", {
        ...data,
        visible: data.visible?.value ?? null,
        status: data.status?.value ?? null,
        slides,
        logoEn,
        logoAr,
        banner,
        picture,
        actionById: userId,
        id: item.id
      });
    },
    successMessage:
      lang === "ar" ? "تم تعديل المشروع بنجاح" : "Project edited successfully",
    onSuccess: refresh
  });

  return (
    <>
      {isEditPopupOpen && (
        <SiteContentProject
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleSiteContent}
          isEdit
          initialData={{
            name: {
              ar: item.name?.ar ?? "",
              en: item.name?.en ?? ""
            },
            city: {
              ar: item.city?.ar ?? "",
              en: item.city?.en ?? ""
            },
            area: item.area ?? 0,
            status: {
              label: item.status
                ? item.status.charAt(0).toUpperCase() +
                  item.status.slice(1).toLowerCase().replaceAll("_", " ")
                : "",
              value: item.status ?? ""
            },
            visible: {
              label: item.visible ? "Yes" : "No",
              value: item.visible ? true : false
            },
            description: {
              ar: item.description?.ar ?? "",
              en: item.description?.en ?? ""
            },
            numberOfEntity: item.numberOfEntity ?? 0,
            nameOfEntity: {
              ar: item.nameOfEntity?.ar ?? "",
              en: item.nameOfEntity?.en ?? ""
            },
            logoEn: item.logo?.en ?? null,
            logoAr: item.logo?.ar ?? null,
            banner: item.banner ?? null,
            picture: item.picture ?? null,
            slides: item.slides
          }}
        />
      )}
      <div
        className="listing__page__table__content__row"
        onClick={() => setIsEditPopupOpen(true)}
      >
        <div className="listing__page__table__content__row__entry checkbox">
          <ListingCheckbox
            checked={selectedRows.includes(item.id)}
            onClick={() => {
              if (selectedRows.includes(item.id)) {
                setSelectedRows(selectedRows.filter((row) => row !== item.id));
              } else {
                setSelectedRows([...selectedRows, item.id]);
              }
            }}
          />
        </div>
        <div className="listing__page__table__content__row__entry">
          {item.number}
        </div>
        <div className="listing__page__table__content__row__entry">
          <img
            loading="lazy"
            src={
              lang === "ar"
                ? (item.logo?.ar ?? undefined)
                : (item.logo?.en ?? undefined)
            }
            alt={item.name?.en ?? undefined}
            className="listing__page__table__content__row__entry__img"
          />
          {lang === "ar" ? item.name?.ar : item.name?.en}
        </div>
        <div className="listing__page__table__content__row__entry">
          {lang === "ar" ? item.city?.ar : item.city?.en}
        </div>
        <div className="listing__page__table__content__row__entry">
          {numberDisplay(item.area ?? 0) || "-"}
        </div>
        <ListingStatus value={item.status} />
        <div className="listing__page__table__content__row__entry">
          {item.visible ? "Yes" : "No"}
        </div>
        <div className="listing__page__table__content__row__entry">
          {item.actionBy.name || "-"}
        </div>
        <ListingDate date={item.createdAt} />
        <ListingDate date={item.updatedAt} />
      </div>
    </>
  );
}
