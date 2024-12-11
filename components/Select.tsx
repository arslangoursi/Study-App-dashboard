"use client";

import "@/styles/login.scss";

import { ISelect } from "@/interfaces";
import ReactSelect from "react-select";
import { useState } from "react";

const Select = ({
  placeholder,
  options,
  value,
  onChange,
  label,
  isMulti,
  disabled
}: ISelect) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!value);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      fontSize: "12px",
      minHeight: "55px",
      borderRadius: "60px",
      borderColor: state.isFocused && !value ? "#DBE0E4" : "var(--grey)",
      backgroundColor: "var(--whiteShadow)"
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--white)",
      zIndex: 9999
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--blue)"
    }),
    menuList: (base: any) => ({
      ...base,
      color: "var(--blue)"
    }),
    placeholder: (base: any, state: any) => ({
      ...base,
      color: state.isFocused || value ? "var(--blue)" : "var(--lightBlue)"
    }),
    option: (base: any) => ({
      ...base,
      fontSize: "12px"
    })
  };

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "var(--goldenLight)",
      primary: "var(--golden)"
    }
  });

  return (
    <div className="container__main__content__details__select">
      <div
        className={`container__main__content__details__select__label ${
          isFocused || value ? "active" : ""
        }`}
      >
        {label}
      </div>
      <ReactSelect
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={customStyles}
        theme={customTheme}
        isDisabled={disabled}
      />
    </div>
  );
};

export default Select;
