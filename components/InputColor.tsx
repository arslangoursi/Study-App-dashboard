"use client";

import "@/styles/login.scss";

import { useEffect, useState } from "react";

interface IInput {
  id?: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  autoFocus?: boolean;
}

export default function InputColor({
  id,
  label,
  value,
  onChange,
  autoFocus = false
}: IInput) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value !== "") {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [value]);

  return (
    <div className="input__color__container">
      <input
        type="color"
        className="input__color__container__input"
        value={value}
        id={id}
        name={id}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
      />
      <label
        htmlFor={id}
        className={`input__color__container__label ${
          isFocused || value ? "focused" : ""
        }`}
      >
        {label}
      </label>
      <div
        style={{ backgroundColor: value }}
        className="input__color__container__overlay"
      />
    </div>
  );
}
