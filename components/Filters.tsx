"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import ClickAwayListener from "react-click-away-listener";
import useHideScrollBar from "@/hooks/useHideScrollBar";
import useLanguage from "@/hooks/useLanguage";

interface IFilters {
  children?: ReactNode;
  onReset?: () => void;
}

export default function Filters({ children, onReset }: IFilters) {
  const [open, setOpen] = useState(false);
  const [lang] = useLanguage();

  useHideScrollBar([open]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (open) setOpen(false);
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          zIndex: 1
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="listing__page__header__actions__icon__button"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33333 6H12.6667M1 1H15M5.66667 11H10.3333"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? "-50%" : "50%" }}
              animate={{ opacity: 1, x: "0" }}
              transition={{ duration: 0.2 }}
              // @ts-ignore
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="listing__page__header__actions__icon__button__popup"
            >
              <div className="listing__page__header__actions__icon__button__popup__header">
                <div className="listing__page__header__actions__icon__button__popup__header__title">
                  {lang === "ar" ? "مرشحات" : "Filters"}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="listing__page__header__actions__icon__button__popup__header__close"
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
              <div className="listing__page__header__actions__icon__button__popup__content">
                {children}
              </div>
              <div className="listing__page__header__actions__icon__button__popup__footer">
                {onReset && (
                  <button
                    type="button"
                    className="listing__page__header__actions__icon__button__popup__footer__button secondary"
                    onClick={onReset}
                  >
                    {lang === "ar" ? "إعادة تعيين" : "Reset"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
}
