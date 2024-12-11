import Loader from "./Loader";
import exportToCSV from "@/utils/exportToCSV";
import useLanguage from "@/hooks/useLanguage";
import { ISiteAnalyticsCard } from "@/interfaces";

export default function SiteAnalyticsCard({
  title,
  data,
  loading
}: ISiteAnalyticsCard) {
  const exportCsv = () => exportToCSV(data, title);
  const [lang] = useLanguage();

  return (
    <div className="site__analytics__cards__card">
      <div className="site__analytics__cards__card__header">
        <div className="site__analytics__cards__card__header__title">
          {title}
        </div>
        <div className="site__analytics__cards__card__header__action">
          <button type="button" onClick={exportCsv}>
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
              className="lucide lucide-cloud-download"
            >
              <path d="M12 13v8l-4-4" />
              <path d="m12 21 4-4" />
              <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
            </svg>
          </button>
        </div>
      </div>
      <div className="site__analytics__cards__card__body">
        <div className="site__analytics__cards__card__body__table">
          <div className="site__analytics__cards__card__body__table__header">
            <div className="site__analytics__cards__card__body__table__header__entry">
              {lang === "ar" ? "القيمة" : "Value"}
            </div>
            <div className="site__analytics__cards__card__body__table__header__entry">
              {lang === "ar" ? "النقرات" : "Clicks"}
            </div>
            <div className="site__analytics__cards__card__body__table__header__entry">
              {lang === "ar" ? "الزيارات" : "Visits"}
            </div>
          </div>
          <div className="site__analytics__cards__card__body__table__body">
            {loading ? (
              <div className="site__analytics__cards__card__body__table__body__empty">
                <Loader color="var(--golden)" />
              </div>
            ) : data.length === 0 ? (
              <div className="site__analytics__cards__card__body__table__body__empty">
                {lang === "ar" ? "لا توجد بيانات" : "No data"}
              </div>
            ) : (
              data.map((item) => (
                <div
                  key={item.key}
                  className="site__analytics__cards__card__body__table__body__row"
                >
                  <div className="site__analytics__cards__card__body__table__body__row__entry">
                    {item.key}
                  </div>
                  <div className="site__analytics__cards__card__body__table__body__row__entry">
                    {item.clicks}
                  </div>
                  <div className="site__analytics__cards__card__body__table__body__row__entry">
                    {item.visits}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
