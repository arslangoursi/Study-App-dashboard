"use client";
import useLanguage from "@/hooks/useLanguage";
import "@/styles/appropriations.scss";

import { memo } from "react";

function Appropriations() {
  const [lang] = useLanguage();
  return (
    <div className="appro__main__container__ovelay">
      <div className="appro__main__container">
        <div data-aos="fade-up" className="appro__main__wraper__title">
          {lang === "ar" ? "الاعتمادات" : "Appropriations"}
        </div>
        <div className="appro__main__wraper__content">
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060662/appr01_vp7z4c.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060663/appr02_qx5bpy.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060663/appr03_qkneyp.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060663/appr04_dw0f2n.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060663/appr05_kv7yym.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060663/appr06_hf280y.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060662/appr07_lezvjz.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060662/appr08_vvxhuf.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060662/appr09_ixdqv1.webp"
            className="appro__main__wraper__content__img"
          />
          <img
            loading="lazy"
            alt="zood"
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/q_50/v1705060662/appr10_ifpcci.webp"
            className="appro__main__wraper__content__img"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Appropriations);
