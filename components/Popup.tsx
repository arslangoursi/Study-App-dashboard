"use client";

import { FormEvent, ReactNode, useState } from "react";

import ClickAwayListener from "react-click-away-listener";
import Loader from "./Loader";
import useHideScrollBar from "@/hooks/useHideScrollBar";
import useLanguage from "@/hooks/useLanguage";
import { toast } from "react-toastify";

interface IFilters {
  children: ReactNode;
  title: string;
  titleAr?: string;
  onSubmit?: (e: any) => void;
  onDiscard?: () => void;
  onClose?: () => void;
  isLarge?: boolean;
  customBody?: boolean;
}
export default function Popup({
  children,
  title,
  titleAr,
  onSubmit,
  onDiscard,
  onClose,
  isLarge,
  customBody
}: IFilters) {
  useHideScrollBar();
  const [lang] = useLanguage();
  const [processing, setProcessing] = useState(false);

  return (
    <>
      <div className="main__popup__container__bg">
        <ClickAwayListener onClickAway={() => onClose && onClose()}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => e.preventDefault()}
            className={"main__popup__container" + (isLarge ? " large" : "")}
          >
            <div className="popup__header">
              <div className="add__user__experience__popup__heading">
                {lang === "ar" ? titleAr || title : title}
              </div>
              <button
                type="button"
                onClick={() => onClose && onClose()}
                className="popup__close__user"
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
            <div
              className="popup__entry__container"
              style={
                customBody
                  ? {
                      padding: 0,
                      overflow: "hidden"
                    }
                  : {}
              }
            >
              {children}
            </div>
            <div className="create__user__form__btn">
              {onSubmit && (
                <button
                  type="button"
                  disabled={processing}
                  onClick={async (e) => {
                    try {
                      setProcessing(true);
                      onSubmit && (await onSubmit(e));
                      setProcessing(false);
                      onClose && onClose();
                    } catch (err: any) {
                      toast.error(err.message);
                      setProcessing(false);
                    }
                  }}
                  className="popup__icon__button__popup__footer__button primary"
                >
                  {processing && <Loader small />}
                  {lang === "ar" ? "تقديم" : "Submit"}
                </button>
              )}
              {onDiscard && (
                <button
                  type="button"
                  disabled={processing}
                  className="popup__icon__button__popup__footer__button secondary"
                  onClick={onDiscard}
                >
                  {lang === "ar" ? "تجاهل" : "Discard"}
                </button>
              )}
            </div>
          </form>
        </ClickAwayListener>
      </div>
    </>
  );
}
