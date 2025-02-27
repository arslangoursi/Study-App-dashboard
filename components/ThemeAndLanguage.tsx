"use client";

import useLanguage from "@/hooks/useLanguage";
import { useTheme } from "next-themes";

export default function ThemeAndLanguage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useLanguage();

  return (
    <div className="theme__button__login">
      <button
        type="button"
        className={`dashboard__main__header__actions__theme${
          theme === "dark" ? " active" : ""
        }`}
        suppressHydrationWarning
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        suppressContentEditableWarning
      >
        <div
          className="dashboard__main__header__actions__theme__section"
          suppressContentEditableWarning
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.70395 12.5788C10.1668 12.5788 12.1633 10.5823 12.1633 8.11947C12.1633 5.65666 10.1668 3.66016 7.70395 3.66016C5.24113 3.66016 3.24463 5.65666 3.24463 8.11947C3.24463 10.5823 5.24113 12.5788 7.70395 12.5788Z"
              fill="currentColor"
            />
            <path
              d="M7.71704 15.1268C7.36603 15.1268 7.07884 14.8652 7.07884 14.5141V14.4631C7.07884 14.1121 7.36603 13.8249 7.71704 13.8249C8.06806 13.8249 8.35525 14.1121 8.35525 14.4631C8.35525 14.8141 8.06806 15.1268 7.71704 15.1268ZM12.2738 13.3271C12.1079 13.3271 11.9483 13.2633 11.8207 13.142L11.7377 13.059C11.4888 12.8101 11.4888 12.4081 11.7377 12.1592C11.9866 11.9103 12.3887 11.9103 12.6376 12.1592L12.7206 12.2421C12.9695 12.491 12.9695 12.8931 12.7206 13.142C12.5993 13.2633 12.4398 13.3271 12.2738 13.3271ZM3.16025 13.3271C2.99432 13.3271 2.83477 13.2633 2.70713 13.142C2.45823 12.8931 2.45823 12.491 2.70713 12.2421L2.79009 12.1592C3.03899 11.9103 3.44106 11.9103 3.68996 12.1592C3.93886 12.4081 3.93886 12.8101 3.68996 13.059L3.607 13.142C3.48574 13.2633 3.3198 13.3271 3.16025 13.3271ZM14.0991 8.77029H14.048C13.697 8.77029 13.4098 8.48309 13.4098 8.13208C13.4098 7.78107 13.697 7.49388 14.048 7.49388C14.3991 7.49388 14.7118 7.78107 14.7118 8.13208C14.7118 8.48309 14.4501 8.77029 14.0991 8.77029ZM1.38604 8.77029H1.33498C0.98397 8.77029 0.696777 8.48309 0.696777 8.13208C0.696777 7.78107 0.98397 7.49388 1.33498 7.49388C1.686 7.49388 1.99872 7.78107 1.99872 8.13208C1.99872 8.48309 1.73705 8.77029 1.38604 8.77029ZM12.1909 4.29646C12.0249 4.29646 11.8654 4.23264 11.7377 4.11138C11.4888 3.86248 11.4888 3.46041 11.7377 3.21151L11.8207 3.12855C12.0696 2.87965 12.4717 2.87965 12.7206 3.12855C12.9695 3.37745 12.9695 3.77952 12.7206 4.02842L12.6376 4.11138C12.5163 4.23264 12.3568 4.29646 12.1909 4.29646ZM3.24322 4.29646C3.07729 4.29646 2.91773 4.23264 2.79009 4.11138L2.70713 4.02204C2.45823 3.77313 2.45823 3.37107 2.70713 3.12216C2.95603 2.87326 3.3581 2.87326 3.607 3.12216L3.68996 3.20513C3.93886 3.45403 3.93886 3.8561 3.68996 4.105C3.5687 4.23264 3.40277 4.29646 3.24322 4.29646ZM7.71704 2.41376C7.36603 2.41376 7.07884 2.15209 7.07884 1.80108V1.75002C7.07884 1.39901 7.36603 1.11182 7.71704 1.11182C8.06806 1.11182 8.35525 1.39901 8.35525 1.75002C8.35525 2.10104 8.06806 2.41376 7.71704 2.41376Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          className="dashboard__main__header__actions__theme__section"
          suppressContentEditableWarning
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.1028 10.6269C14.0029 10.4548 13.7219 10.1871 13.0224 10.3146C12.6352 10.3847 12.2418 10.4166 11.8483 10.3974C10.3932 10.3337 9.0755 9.6517 8.15747 8.60002C7.3456 7.67581 6.84599 6.47116 6.83974 5.17089C6.83974 4.44428 6.97714 3.74315 7.25817 3.08027C7.53295 2.43652 7.33935 2.0987 7.20196 1.95848C7.05832 1.81188 6.72109 1.60792 6.0591 1.88837C3.50485 2.98467 1.92483 5.59794 2.11218 8.39606C2.29954 11.0285 4.11062 13.2784 6.50875 14.1261C7.0833 14.3301 7.68908 14.4512 8.31359 14.4767C8.41352 14.4831 8.51344 14.4894 8.61336 14.4894C10.7055 14.4894 12.6664 13.4824 13.903 11.7678C14.3214 11.175 14.209 10.799 14.1028 10.6269Z" />
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
    </div>
  );
}
