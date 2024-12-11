"use client";

import { IInput } from "@/interfaces";
import "@/styles/login.scss";

import { CSSProperties, KeyboardEvent, useEffect, useState } from "react";

export default function TagInput({
  label,
  id,
  value,
  type = "text",
  error,
  onChange,
  autoFocus = false,
  required = false,
  style
}: IInput) {
  const [isFocused, setIsFocused] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (inputValue !== "") {
      setIsFocused(true);
    }
  }, [inputValue]);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
      onChange(tags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
    onChange(tags);
  };

  return (
    <div
      style={{
        border: "none",
        marginTop: "0em"
      }}
      className="tag__main__input__login"
    >
      <div className="tag__main__input__warper">
        <div className="tags__container__inner">
          {tags.map((tag, index) => (
            <span key={index} className="tag_entry">
              {tag}
              <button
                type="button"
                className="remove__btn__tag"
                onClick={() => removeTag(index)}
              >
                x
              </button>
            </span>
          ))}
        </div>
        <input
          id={id}
          name={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className="input__entry__input__tag"
          style={style}
        />
        <label
          htmlFor={id}
          className={
            label &&
            `container__main__content__details__main__input__label__tag` +
              (isFocused ? " focused" : "") +
              (inputValue !== "" ? " filled" : "") +
              (tags.length > 0 ? " filled" : "")
          }
        >
          {label} {required && <span className="required">*</span>}
        </label>
      </div>
      <div className="container__main__content__details__main__input__error">
        {error}
      </div>
    </div>
  );
}
