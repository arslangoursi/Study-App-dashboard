"use client";

import useLanguage from "@/hooks/useLanguage";
import { useTheme } from "next-themes";

export default function DashboardThemeAndLanguage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useLanguage();

  return (
    <>
      <button
        type="button"
        className={`dashboard__main__header__actions__theme${
          theme === "dark" ? " active" : ""
        }`}
        suppressHydrationWarning
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="dashboard__main__header__actions__theme__section">
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.704 12.579a4.46 4.46 0 1 0 0-8.919 4.46 4.46 0 0 0 0 8.919ZM7.717 15.127c-.351 0-.638-.262-.638-.613v-.05a.64.64 0 0 1 .638-.64.64.64 0 0 1 .638.64c0 .35-.287.663-.638.663Zm4.557-1.8a.654.654 0 0 1-.453-.185l-.083-.083a.635.635 0 1 1 .9-.9l.083.083a.636.636 0 0 1-.447 1.085Zm-9.114 0a.636.636 0 0 1-.453-1.085l.083-.083a.636.636 0 1 1 .9.9l-.083.083a.639.639 0 0 1-.447.185ZM14.1 8.77h-.052a.64.64 0 0 1-.638-.638.64.64 0 0 1 .638-.638c.351 0 .664.287.664.638 0 .351-.262.638-.613.638Zm-12.714 0h-.051a.64.64 0 0 1-.638-.638.64.64 0 0 1 .638-.638c.351 0 .664.287.664.638 0 .351-.262.638-.613.638Zm10.805-4.474a.636.636 0 0 1-.453-1.085l.083-.082a.636.636 0 1 1 .9.9l-.083.082a.628.628 0 0 1-.447.185Zm-8.948 0a.654.654 0 0 1-.453-.185l-.083-.089a.636.636 0 1 1 .9-.9l.083.083a.636.636 0 0 1 0 .9.62.62 0 0 1-.447.191Zm4.474-1.882c-.351 0-.638-.262-.638-.613V1.75a.64.64 0 0 1 .638-.638.64.64 0 0 1 .638.638c0 .351-.287.664-.638.664Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="dashboard__main__header__actions__theme__section">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.103 10.627c-.1-.172-.381-.44-1.08-.312-.388.07-.781.102-1.175.082A5.21 5.21 0 0 1 8.158 8.6 5.238 5.238 0 0 1 6.84 5.17c0-.726.137-1.427.418-2.09.275-.643.081-.981-.056-1.122-.144-.146-.48-.35-1.143-.07-2.554 1.097-4.134 3.71-3.947 6.508.188 2.632 1.999 4.882 4.397 5.73.574.204 1.18.325 1.805.35.1.007.2.013.3.013a6.516 6.516 0 0 0 5.289-2.721c.418-.593.306-.969.2-1.141Z" />
          </svg>
        </div>
      </button>
      <button
        type="button"
        className={
          "dashboard__main__header__actions__language" +
          (language === "ar" ? " active" : "")
        }
        onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      >
        <div className="dashboard__main__header__actions__language__section">
          EN
        </div>
        <div className="dashboard__main__header__actions__language__section">
          ع
        </div>
      </button>
    </>
  );
}
