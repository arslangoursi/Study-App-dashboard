"use client";

import "@/styles/contactsection.scss";

import Image from "next/image";
import Loader from "./Loader";
import axios from "axios";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

export default function ContactSection() {
  const [lang] = useLanguage();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlotError, setTimeSlotError] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("");

  const [loading, handleSubmit] = useAction({
    promise: (e) => {
      e.preventDefault();
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setTimeSlotError("");

      if (!name) {
        setNameError(lang === "ar" ? "يرجى إدخال الاسم" : "Enter name");
      }
      if (!email) {
        setEmailError(
          lang === "ar" ? "يرجى إدخال البريد الألكتروني" : "Enter email"
        );
      }
      if (!phone) {
        setPhoneError(
          lang === "ar" ? "يرجى إدخال رقم الهاتف" : "Enter phone number"
        );
      }
      if (!timeSlot) {
        setTimeSlotError(
          lang === "ar" ? "يرجى إدخال وقت التواصل" : "Enter preferred time slot"
        );
      }

      return axios.post("/api/scheduleCall", {
        name,
        email,
        phone,
        timeSlot,
        preferredContactMethod
      });
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setPhone("");
      setTimeSlot("");
      setPreferredContactMethod("");
    },
    successMessage:
      lang === "ar" ? "تم إرسال الطلب بنجاح" : "Request Sent Successfully"
  });

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="contact__about__section"
      >
        <div className="contact__about__section__content">
          <div className="contact__about__section__content__left">
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="contact__about__section__content__left__heading heading__with__span"
            >
              {lang === "ar" ? "اتصل بنا" : "Contact Us"}
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1200"
              className="contact__about__section__content__left__info"
            >
              {lang === "ar"
                ? "للحصول على دعم لوجستي مخصص، تواصل مع فريقنا."
                : "For personalized logistics support, reach out to our team."}
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="contact__about__section__content__left__socials"
            >
              <div className="contact__about__section__content__left__socials__icon">
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.0073"
                    cy="20.7231"
                    r="19.8589"
                    fill="#FFB83D"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M24.8525 15.1846H15.1592C14.6083 15.1846 14.08 15.4034 13.6904 15.793C13.3009 16.1825 13.082 16.7108 13.082 17.2617V24.1855C13.082 24.7364 13.3009 25.2648 13.6904 25.6543C14.08 26.0439 14.6083 26.2627 15.1592 26.2627H24.8525C25.4034 26.2627 25.9318 26.0439 26.3213 25.6543C26.7108 25.2648 26.9297 24.7364 26.9297 24.1855V17.2617C26.9297 16.7108 26.7108 16.1825 26.3213 15.793C25.9318 15.4034 25.4034 15.1846 24.8525 15.1846ZM24.8525 16.5693L20.3521 19.6643C20.2468 19.7251 20.1274 19.757 20.0059 19.757C19.8843 19.757 19.7649 19.7251 19.6597 19.6643L15.1592 16.5693H24.8525Z"
                    fill="#FABB18"
                  />
                </svg>
              </div>
              <div className="contact__about__section__content__left__socials__name__contact">
                <div className="contact__about__section__content__left__socials__name__contact__name">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </div>
                <div className="contact__about__section__content__left__socials__name__contact__email">
                  <a href="mailto:contact@zood.sa">contact@zood.sa</a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1300"
              className="contact__about__section__content__left__socials"
            >
              <div className="contact__about__section__content__left__socials__icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.8589"
                    cy="19.8589"
                    r="19.8589"
                    fill="#519CD2"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M22.4441 21.6088L22.1132 21.9382C22.1132 21.9382 21.3256 22.7207 19.1767 20.5841C17.0278 18.4476 17.8153 17.6651 17.8153 17.6651L18.0233 17.4571C18.5375 16.9466 18.5862 16.1263 18.1375 15.527L17.2212 14.3031C16.6656 13.5614 15.593 13.4632 14.9566 14.0959L13.8149 15.2303C13.5 15.5445 13.2891 15.9503 13.3146 16.4012C13.38 17.5553 13.9022 20.0373 16.814 22.9331C19.9025 26.0034 22.8004 26.1256 23.9851 26.015C24.3603 25.9801 24.6861 25.7896 24.9487 25.5278L25.9813 24.5009C26.6794 23.8079 26.4831 22.6189 25.5901 22.1338L24.2011 21.3783C23.6149 21.0605 22.9023 21.1536 22.4441 21.6088Z"
                    fill="#519CD2"
                  />
                </svg>
              </div>
              <div className="contact__about__section__content__left__socials__name__contact">
                <div className="contact__about__section__content__left__socials__name__contact__name">
                  {lang === "ar" ? "رقم التواصل " : "Phone"}
                </div>
                <div className="contact__about__section__content__left__socials__name__contact__email">
                  <a href="tel:966920000077">920000077</a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1500"
              className="contact__about__section__content__left__socials"
            >
              <div className="contact__about__section__content__left__socials__icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.8589"
                    cy="19.8589"
                    r="19.8589"
                    fill="#F7E9D0"
                  />
                  <path
                    d="M19.8601 12.582C20.5282 12.582 21.1726 12.6673 21.7933 12.8379C22.4141 13.0085 22.9945 13.2525 23.5347 13.57C24.0749 13.8874 24.5653 14.2665 25.0059 14.7072C25.4466 15.1478 25.8257 15.6406 26.1431 16.1855C26.4606 16.7304 26.7046 17.3109 26.8752 17.9269C27.0458 18.5429 27.1334 19.1873 27.1382 19.8601C27.1382 20.5282 27.0529 21.1726 26.8823 21.7933C26.7117 22.4141 26.4677 22.9945 26.1502 23.5347C25.8328 24.0749 25.4537 24.5653 25.013 25.0059C24.5724 25.4466 24.0796 25.8257 23.5347 26.1431C22.9898 26.4606 22.4093 26.7046 21.7933 26.8752C21.1774 27.0458 20.533 27.1334 19.8601 27.1382C19.192 27.1382 18.5476 27.0529 17.9269 26.8823C17.3061 26.7117 16.7257 26.4677 16.1855 26.1502C15.6454 25.8328 15.1549 25.4537 14.7143 25.013C14.2736 24.5724 13.8945 24.0796 13.5771 23.5347C13.2596 22.9898 13.0156 22.4117 12.845 21.8005C12.6744 21.1892 12.5868 20.5424 12.582 19.8601C12.582 19.192 12.6673 18.5476 12.8379 17.9269C13.0085 17.3061 13.2525 16.7257 13.57 16.1855C13.8874 15.6454 14.2665 15.1549 14.7072 14.7143C15.1478 14.2736 15.6406 13.8945 16.1855 13.5771C16.7304 13.2596 17.3085 13.0156 17.9198 12.845C18.531 12.6744 19.1778 12.5868 19.8601 12.582ZM19.8601 26.2284C20.4429 26.2284 21.0044 26.1526 21.5446 26.001C22.0848 25.8494 22.5918 25.6361 23.0656 25.3613C23.5394 25.0865 23.9706 24.7524 24.3592 24.3592C24.7477 23.9659 25.0794 23.5371 25.3542 23.0727C25.629 22.6083 25.8446 22.1013 26.001 21.5517C26.1573 21.002 26.2332 20.4382 26.2284 19.8601C26.2284 19.2773 26.1526 18.7158 26.001 18.1756C25.8494 17.6355 25.6361 17.1285 25.3613 16.6546C25.0865 16.1808 24.7524 15.7496 24.3592 15.3611C23.9659 14.9725 23.5371 14.6408 23.0727 14.366C22.6083 14.0912 22.1013 13.8756 21.5517 13.7192C21.002 13.5629 20.4382 13.4871 19.8601 13.4918C19.2773 13.4918 18.7158 13.5676 18.1756 13.7192C17.6355 13.8709 17.1285 14.0841 16.6546 14.3589C16.1808 14.6337 15.7496 14.9678 15.3611 15.3611C14.9725 15.7543 14.6408 16.1832 14.366 16.6475C14.0912 17.1119 13.8756 17.6189 13.7192 18.1685C13.5629 18.7182 13.4871 19.282 13.4918 19.8601C13.4918 20.4429 13.5676 21.0044 13.7192 21.5446C13.8709 22.0848 14.0841 22.5918 14.3589 23.0656C14.6337 23.5394 14.9678 23.9706 15.3611 24.3592C15.7543 24.7477 16.1832 25.0794 16.6475 25.3542C17.1119 25.629 17.6189 25.8446 18.1685 26.001C18.7182 26.1573 19.282 26.2332 19.8601 26.2284ZM24.1033 19.9738L24.4444 18.9503H24.9775L24.3734 20.7699H23.8403L23.4991 19.7464L23.158 20.7699H22.6249L22.0208 18.9503H22.5538L22.895 19.9738L23.2362 18.9503H23.7621L24.1033 19.9738ZM20.8054 18.9503H21.3385L20.7343 20.7699H20.2013L19.8601 19.7464L19.5189 20.7699H18.9859L18.3817 18.9503H18.9148L19.256 19.9738L19.5971 18.9503H20.1231L20.4642 19.9738L20.8054 18.9503ZM17.1664 18.9503H17.6994L17.0953 20.7699H16.5622L16.2211 19.7464L15.8799 20.7699H15.3468L14.7427 18.9503H15.2758L15.6169 19.9738L15.9581 18.9503H16.484L16.8252 19.9738L17.1664 18.9503Z"
                    fill="#FABB18"
                  />
                </svg>
              </div>
              <div className="contact__about__section__content__left__socials__name__contact">
                <div className="contact__about__section__content__left__socials__name__contact__name">
                  {lang === "ar" ? "الموقع الإلكتروني" : "Website"}
                </div>
                <div className="contact__about__section__content__left__socials__name__contact__email">
                  <a
                    href="https://zood.sa"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    zood.sa
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1500"
              className="contact__about__section__content__left__socials"
            >
              <div className="contact__about__section__content__left__socials__icon">
                <img
                  loading="lazy"
                  height={40}
                  width={40}
                  src="/icon4.webp"
                  alt="whatsapp"
                />
              </div>
              <div className="contact__about__section__content__left__socials__name__contact">
                <div className="contact__about__section__content__left__socials__name__contact__name">
                  {lang === "ar" ? "واتساب" : "Whatsapp"}
                </div>
                <div className="contact__about__section__content__left__socials__name__contact__email">
                  <a
                    href="https://wa.me/966920000077"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    920000077
                  </a>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="contact__about__section__content__right"
          >
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="contact__about__section__content__right__form"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                className="contact__about__section__content__right__form__heading"
              >
                {lang === "ar" ? "طلب جدولة مكالمة " : "Schedule a Call"}
              </div>
              <div className="from__info__input__warper">
                <div
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  className="contact__about__section__content__right__form__label"
                >
                  {lang === "ar" ? "الاسم" : "Name"}
                </div>
                <input
                  required
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  placeholder={lang === "ar" ? "أدخل الاسم" : "Enter Name"}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setNameError("Enter the name");
                    } else {
                      setNameError("");
                    }
                    setName(e.target.value);
                  }}
                  className="contact__about__section__content__right__form__input"
                />
                {nameError && (
                  <div className="contact__about__form__input__error">
                    {nameError}
                  </div>
                )}
              </div>
              <div className="from__info__input__warper">
                <div
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  className="contact__about__section__content__right__form__label"
                >
                  {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                </div>
                <input
                  required
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  placeholder={
                    lang === "ar" ? "أدخل البريد الإلكتروني" : "Enter Email"
                  }
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setEmailError("Enter the email");
                    } else {
                      setEmailError("");
                    }
                    setEmail(e.target.value);
                  }}
                  className="contact__about__section__content__right__form__input"
                />
                {emailError && (
                  <div className="contact__about__form__input__error">
                    {emailError}
                  </div>
                )}
              </div>
              <div className="from__info__input__warper">
                <div
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  className="contact__about__section__content__right__form__label"
                >
                  {lang === "ar" ? "رقم التواصل" : "Phone"}
                </div>
                <input
                  required
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  placeholder={lang === "ar" ? "أدخل الهاتف" : "Enter Phone"}
                  type="tel"
                  className="contact__about__section__content__right__form__input"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && value.length < 10) {
                      setPhoneError(
                        lang === "ar"
                          ? "يرجى إدخال رقم هاتف مكون من 10 أرقام على الأقل"
                          : "Enter the phone number min 10 digits"
                      );
                    } else if (value && /^\d+$/.test(value)) {
                      setPhoneError("");
                    } else {
                      setPhoneError(
                        lang === "ar"
                          ? "يرجى إدخال أرقام فقط"
                          : "Enter only phone No. min 10"
                      );
                    }

                    setPhone(value);
                  }}
                />
                {phoneError && (
                  <div className="contact__about__form__input__error">
                    {phoneError}
                  </div>
                )}
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                className="contact__about__section__content__right__form__label"
                style={{
                  paddingBottom: "16px"
                }}
              >
                {lang === "ar"
                  ? " يرجى إعلامنا عندما نتمكن من الاتصال بك"
                  : "  Please let us know when we can call you"}
              </div>
              <div className="create__account__input__warper__select__btn__wrapper">
                <button
                  onClick={() => setTimeSlot("9am-12pm")}
                  type="button"
                  className={`create__account__input__warper__select__btn ${
                    timeSlot === "9am-12pm" ? "active" : ""
                  }`}
                >
                  {lang === "ar" ? "9 صباحًا - 12 ظهرًا" : "  9am-12pm"}
                </button>
                <button
                  onClick={() => setTimeSlot("1pm-4pm")}
                  type="button"
                  className={`create__account__input__warper__select__btn ${
                    timeSlot === "1pm-4pm" ? "active" : ""
                  }`}
                >
                  {lang === "ar" ? "1 ظهرًا - 4 مساءً" : "  1pm-4pm"}
                </button>
                <button
                  onClick={() => setTimeSlot("5pm-9pm")}
                  type="button"
                  className={`create__account__input__warper__select__btn ${
                    timeSlot === "5pm-9pm" ? "active" : ""
                  }`}
                >
                  {lang === "ar" ? "5 مساءً - 9 مساءً" : "  5pm-9pm"}
                </button>
              </div>
              {timeSlotError && (
                <div className="contact__about__form__input__error">
                  {timeSlotError}
                </div>
              )}
              <div className="contact__about__section__content__right__form__label">
                {lang === "ar"
                  ? "اختر طريقة التواصل المناسبة"
                  : "  Choose the appropriate communication method"}
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                className="contact__about__section__content__right__form__social__button"
              >
                <div className="contact__about__section__content__right__form__social__button__social">
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("email")}
                    className={
                      "contact__about__section__content__right__form__social__button__social__button" +
                      (preferredContactMethod === "email" ? " active" : "")
                    }
                  >
                    <img loading="lazy" src="/icon.webp" alt="email" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("team")}
                    className={
                      "contact__about__section__content__right__form__social__button__social__button" +
                      (preferredContactMethod === "team" ? " active" : "")
                    }
                  >
                    <img loading="lazy" src="/icon2.webp" alt="team" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("phone")}
                    className={
                      "contact__about__section__content__right__form__social__button__social__button" +
                      (preferredContactMethod === "phone" ? " active" : "")
                    }
                  >
                    <img loading="lazy" src="/icon3.webp" alt="phone" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContactMethod("whatsapp")}
                    className={
                      "contact__about__section__content__right__form__social__button__social__button" +
                      (preferredContactMethod === "whatsapp" ? " active" : "")
                    }
                  >
                    <img loading="lazy" src="/icon4.webp" alt="whatsapp" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="contact__about__section__content__right__form__social__button__button"
                >
                  {loading ? (
                    <Loader small />
                  ) : lang === "ar" ? (
                    "إرسال"
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="contact__about__section__bottom">
          <Image
            src="/assets/contactform.webp"
            alt="contact"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
