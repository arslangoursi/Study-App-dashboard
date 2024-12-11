"use client";

import { useEffect, useState } from "react";

import { ITextArea } from "@/interfaces";

export default function TextArea({
  help,
  example,
  label,
  id,
  error,
  type,
  secure,
  style,
  defaultOptions,
  prefix,
  isRtl,
  ...props
}: ITextArea) {
  const [value, setValue] = useState(props?.value ? props?.value : "");

  useEffect(() => {
    setValue(props?.value ? props?.value : "");
  }, [props]);

  const [isSecure, setIsSecure] = useState(true);

  return (
    <div
      className={
        `container__main__content__details__main__input` + (isRtl ? " rtl" : "")
      }
      style={style}
    >
      <label
        htmlFor={id}
        className="container__main__content__details__main__input__label"
      >
        {label}
      </label>
      <div className="container__main__content__details__main__input__field__wrapper__textarea">
        <textarea
          id={id}
          name={id}
          value={value}
          autoComplete="off"
          aria-autocomplete="none"
          className={`container__main__content__details__main__input__field__textarea${
            value?.length > 0 ? " has__value" : ""
          }`}
          placeholder={type === "time" ? "HH:MM" : props?.placeholder}
          {...props}
        />
        {secure && (
          <button
            type="button"
            onClick={() => setIsSecure(!isSecure)}
            className="container__main__content__details__main__input__button"
          >
            {isSecure ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-eye-off"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-eye"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="container__main__content__details__main__input__error">
          {error}
        </div>
      )}
    </div>
  );
}
