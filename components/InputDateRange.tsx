import "@/styles/user.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/datePicker.scss";

import ClickAwayListener from "react-click-away-listener";
import { DateRange } from "react-date-range";
import { IDateRange } from "@/interfaces";
import dayjs from "dayjs";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

export default function InputDateRange({
  left,
  value,
  onChange,
  disabled,
  reverse,
  style,
  label
}: IDateRange) {
  const [lang] = useLanguage();
  const [showCalender, setShowCalender] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowCalender(false)}>
      <button type="button" className="input__date__range__wrapper">
        <div className="input__date__title">{label}</div>
        <div
          className="input__date__range__wrapper__text"
          onClick={() => {
            if (!disabled) setShowCalender(!showCalender);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.99601C0 8.79561 0.61146 9.40707 1.41106 9.40707H7.99601C8.79561 9.40707 9.40707 8.79561 9.40707 7.99601V4.23318H0V7.99601ZM7.99601 0.940707H7.0553V0.470354C7.0553 0.188141 6.86716 0 6.58495 0C6.30274 0 6.1146 0.188141 6.1146 0.470354V0.940707H3.29247V0.470354C3.29247 0.188141 3.10433 0 2.82212 0C2.53991 0 2.35177 0.188141 2.35177 0.470354V0.940707H1.41106C0.61146 0.940707 0 1.55217 0 2.35177V3.29247H9.40707V2.35177C9.40707 1.55217 8.79561 0.940707 7.99601 0.940707Z"
              fill="#ffc74c"
            />
          </svg>
          <span>
            {value ? (
              <>
                From: {dayjs(value.startDate).format("DD MMM YYYY")} To:{" "}
                {dayjs(value.endDate).format("DD MMM YYYY")}
              </>
            ) : lang === "ar" ? (
              "حدد نطاق التاريخ"
            ) : (
              "Select Date Range"
            )}
          </span>
        </div>
        {showCalender && (
          <div
            className={`date__range__wrapper__calender ${
              left ? "date__range__wrapper__calender__left" : ""
            }`}
            style={{
              ...style,
              ...(reverse ? { left: "0", right: "unset" } : {})
            }}
          >
            <DateRange
              onChange={(ranges: any) => {
                if (onChange) {
                  const { startDate, endDate } = ranges.selection;
                  onChange({
                    startDate: startDate || new Date(),
                    endDate: endDate || new Date()
                  });
                }
              }}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={[
                {
                  startDate: value?.startDate || new Date(),
                  endDate: value?.endDate || new Date(),
                  key: "selection"
                }
              ]}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="backwards"
              rangeColors={["var(--golden)"]}
            />
          </div>
        )}
      </button>
    </ClickAwayListener>
  );
}
