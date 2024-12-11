"use client";

import "@/styles/form.scss";

import axios from "axios";
import { interestSelectedOptionsAtom } from "@/constants/state";
import interests from "@/data/interests.json";
import useAction from "@/hooks/useAction";
import { useAtom } from "jotai";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

function Interested() {
  const [lang] = useLanguage();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useAtom(
    interestSelectedOptionsAtom
  );

  const toggleSelection: (option: string) => void = (option: string): void => {
    setSelectedOptions((prev: string[]) =>
      prev.includes(option)
        ? prev.filter((item: string) => item !== option)
        : [...prev, option]
    );
  };

  const isSelected = (option: string) => selectedOptions.includes(option);

  const [loading, handleSubmit] = useAction({
    promise: (e) => {
      e.preventDefault();

      if (phone.match(/[a-z]/i)) {
        return Promise.reject("Invalid phone number");
      }

      return axios.post("/api/interest", {
        name,
        phone,
        email,
        interests: selectedOptions.map(
          (option) => interests.find(({ name }) => name === option)?.name
        )
      });
    },
    onSuccess: () => {
      setEmail("");
      setName("");
      setPhone("");
      setSelectedOptions([]);
    },
    successMessage:
      lang === "ar" ? "تم التسجيل بنجاح" : "Registered successfully"
  });

  return (
    <>
      <section id="form">
        <form onSubmit={handleSubmit} className="form">
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            className="form__content"
          >
            <div className="form__content__right">
              <div className="form__content__right__content">
                <div
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  className="form__content__right__content__heading"
                >
                  {lang === "ar" ? "سجّل إهتمامك" : "Interested"}
                </div>
                <div className="form__content__right__content__form">
                  <div
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-duration="1200"
                    className="form__content__right__content__form__input"
                  >
                    <input
                      className="form__content__right__content__form__input__entry"
                      required
                      type="text"
                      placeholder={lang === "ar" ? "اسم" : "Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="form__content__right__content__form__input__entry"
                      required
                      type="text"
                      placeholder={
                        lang === "ar" ? "رقم الجوال" : "Phone Number"
                      }
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-duration="1400"
                    className="form__content__right__content__form__input"
                  >
                    <input
                      className="form__content__right__content__form__input__entry"
                      required
                      type="email"
                      style={{
                        width: "100%",
                        maxWidth: "100%"
                      }}
                      placeholder={lang === "ar" ? "بريد إلكتروني" : "Email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-duration="1500"
                    className="form__content__right__content__form__buttons"
                  >
                    {interests.map((option) => (
                      <button
                        type="button"
                        key={option.name}
                        className={`form__content__right__content__form__buttons__button ${
                          isSelected(option.name) ? "selected" : ""
                        }`}
                        onClick={() => toggleSelection(option.name)}
                      >
                        <img
                          loading="lazy"
                          src={option.imgSrc}
                          alt={`${option.name} icon`}
                          className="from__content__right__content__form__buttons__button__img"
                        />
                        <div className="from__content__right__content__form__buttons__button__name">
                          {option.name}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="form__content__right__content__form__button register__button">
                    <button type="submit">
                      {loading
                        ? lang === "ar"
                          ? "جاري التحميل..."
                          : "Loading..."
                        : lang === "ar"
                          ? "تسجيل"
                          : "Register"}

                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9792 12.0233C11.2504 12.1546 11.0425 11.8263 11.0512 11.1238C11.0841 8.7163 11.0687 6.32196 11.0512 3.92105C11.0512 3.57087 11.1475 3.20318 10.9068 2.78297C10.1933 3.17035 9.72056 3.80505 9.17559 4.34345C6.72434 6.75968 4.2855 9.18905 1.85906 11.6315C1.49575 11.9992 1.10836 12.4851 0.675014 11.9905C0.283252 11.5527 0.797576 11.115 1.139 10.778C4.00463 7.9211 6.87098 5.06424 9.73807 2.20737C9.84812 2.05993 9.94759 1.90487 10.0357 1.74337H0.900441C0.364231 0.848231 0.47804 0.581223 1.47605 0.576845C4.77867 0.559336 8.08348 0.576844 11.3861 0.561523C11.9267 0.561523 12.2003 0.723484 12.2003 1.2969C12.2003 4.67175 12.2112 8.04878 12.2003 11.4258C12.2064 11.646 12.1272 11.8601 11.9792 12.0233Z"
                          fill="#FFF6F2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="form__content__right__bottom">
                <svg
                  width="227"
                  height="234"
                  viewBox="0 0 227 234"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_942_111"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="227"
                    height="234"
                  >
                    <rect width="226.372" height="233.125" fill="#ACBECC" />
                  </mask>
                  <g mask="url(#mask0_942_111)">
                    <circle
                      opacity="0.3"
                      cx="161.692"
                      cy="168.302"
                      r="95.1831"
                      stroke="#0D1F35"
                      strokeWidth="0.75"
                    />
                    <circle
                      opacity="0.5"
                      cx="161.692"
                      cy="168.304"
                      r="127.064"
                      stroke="#0D1F35"
                      strokeWidth="0.75"
                    />
                    <circle
                      cx="161.691"
                      cy="168.303"
                      r="158.702"
                      stroke="#0D1F35"
                      strokeWidth="0.75"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Interested;
