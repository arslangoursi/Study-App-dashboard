"use client";

import "@/styles/form.scss";

import Image from "next/image";
import axios from "axios";
import useAction from "@/hooks/useAction";
import useLanguage from "@/hooks/useLanguage";
import { useState } from "react";

export default function Newsletter() {
  const [lang] = useLanguage();

  const [email, setEmail] = useState("");

  const [loading, handleSubmit] = useAction({
    promise: (e) => {
      e.preventDefault();

      return axios.post("/api/newsletter", { email });
    },
    onSuccess: () => {
      setEmail("");
    },
    successMessage:
      lang === "ar" ? "تم التسجيل بنجاح" : "Registered successfully"
  });

  return (
    <form onSubmit={handleSubmit} className="register__card">
      <div className="register__card__content">
        <div className="register__card__content__heading heading__with__span">
          {lang === "ar" ? "للأحدث" : " For the latest"}{" "}
          <span>{lang === "ar" ? "التطورات" : "Developments"}</span>
        </div>
        <div className="register__card__content__info">
          {lang === "ar"
            ? "سجل بريدك الإلكتروني لتلقي أحدث عروض وخطط زود"
            : "Register your email to receive ZOOD's latest offers and plans"}
        </div>
        <div className="register__card__content__form">
          <svg
            className="register__card__content__form__svg"
            width="17"
            height="14"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.93766 13.9085C1.48416 13.9085 1.09608 13.7472 0.773406 13.4245C0.450735 13.1018 0.289124 12.7135 0.288574 12.2594V2.36491C0.288574 1.91141 0.450185 1.52332 0.773406 1.20065C1.09663 0.87798 1.48471 0.71637 1.93766 0.71582H15.1304C15.5839 0.71582 15.9722 0.877431 16.2954 1.20065C16.6187 1.52387 16.78 1.91196 16.7795 2.36491V12.2594C16.7795 12.7129 16.6181 13.1013 16.2954 13.4245C15.9728 13.7477 15.5844 13.9091 15.1304 13.9085H1.93766ZM8.53401 8.13672L15.1304 4.014V2.36491L8.53401 6.48763L1.93766 2.36491V4.014L8.53401 8.13672Z"
              fill="#7A7A7A"
            />
          </svg>
          <input
            type="email"
            placeholder={lang === "ar" ? "بريد إلكتروني" : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="register__card__content__form__button">
            {loading
              ? lang === "ar"
                ? "جاري التحميل..."
                : "Loading..."
              : lang === "ar"
                ? "تسجيل"
                : "Register"}
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1666 10.273C10.4778 10.3853 10.2813 10.1047 10.2896 9.50445C10.3206 7.44737 10.3061 5.40152 10.2896 3.35005C10.2896 3.05084 10.3806 2.73667 10.1531 2.37761C9.47875 2.70861 9.03197 3.25093 8.51693 3.71097C6.2003 5.77553 3.8954 7.85131 1.60221 9.93831C1.25885 10.2525 0.892744 10.6676 0.483198 10.245C0.112951 9.87098 0.599028 9.49697 0.921701 9.20897C3.62995 6.76791 6.33889 4.32685 9.04852 1.88579C9.15253 1.75981 9.24653 1.62732 9.32982 1.48933H0.696244C0.189482 0.72447 0.297041 0.496324 1.24024 0.492584C4.36148 0.477623 7.48479 0.492583 10.606 0.479492C11.1169 0.479492 11.3755 0.61788 11.3755 1.10784C11.3755 3.99149 11.3858 6.877 11.3755 9.76252C11.3813 9.9507 11.3065 10.1336 11.1666 10.273Z"
                fill="#FFF6F2"
              />
            </svg>
          </button>
        </div>
        <div className="register__left__img">
          <Image
            className="register__left__img__img"
            src="/assets/registerleftimg.webp"
            alt="register"
            width={300}
            height={300}
          />
        </div>
      </div>
    </form>
  );
}
