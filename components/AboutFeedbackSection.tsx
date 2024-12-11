"use client";

import "@/styles/aboutfeedback.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import { Navigation } from "swiper/modules";
import useLanguage from "@/hooks/useLanguage";

export default function AboutFeedbackSection() {
  const [lang] = useLanguage();
  const [swiperSlides, setSwiperSlides] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWidth = () => {
      const width = window.innerWidth;
      if (width > 1600) {
        setSwiperSlides(3);
      } else if (width > 1200) {
        setSwiperSlides(2.8);
      } else if (width > 950) {
        setSwiperSlides(2.5);
      } else if (width > 700) {
        setSwiperSlides(2);
      } else {
        setSwiperSlides(1.2);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [swiperSlides]);

  return (
    <div>
      <div className="feedback__about">
        <div className="feedback__about__content">
          <div className="feedback__navigation">
            <button
              className="feedback__navigation__entry feedback__prev"
              title="Previous"
            >
              <svg
                className="feedback__navigation__entry__svg"
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.1638 0.433969C7.63185 0.786784 7.55289 1.08404 7.14004 1.4566C5.72377 2.73165 4.34101 4.0276 2.95561 5.32836C2.75217 5.5166 2.48679 5.6583 2.37208 6.02404C2.98066 6.23031 3.60351 6.16377 4.20923 6.19096C6.93059 6.3162 9.65291 6.42716 12.3762 6.52387C12.7851 6.53729 13.2756 6.50117 13.2212 7.0188C13.1775 7.48169 12.6467 7.41819 12.2674 7.40101C9.06728 7.27191 5.8668 7.14237 2.66592 7.01242C2.52111 7.02774 2.37756 7.0533 2.23637 7.08892L7.14694 12.3961C6.91514 13.1888 6.69885 13.2662 6.15984 12.6887C4.37437 10.7795 2.60808 8.85013 0.823885 6.9397C0.533297 6.62565 0.48033 6.37965 0.813457 6.07142C2.77408 4.2573 4.73009 2.43566 6.69786 0.626722C6.82248 0.504746 6.98943 0.435681 7.1638 0.433969Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className="feedback__navigation__entry feedback__next"
              title="Next"
            >
              <svg
                className="feedback__navigation__entry__svg"
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.92078 13.0223C6.43935 12.688 6.50667 12.3879 6.9047 11.9995C8.27026 10.6703 9.60152 9.32152 10.9352 7.96781C11.1312 7.7718 11.3908 7.61987 11.4912 7.24994C10.8751 7.06752 10.2553 7.15825 9.64896 7.15467C6.92479 7.13548 4.20022 7.13059 1.47523 7.13998C1.06612 7.14249 0.577396 7.19768 0.611615 6.67832C0.637268 6.21408 1.1701 6.25687 1.54982 6.25927C4.75252 6.26368 7.95562 6.26851 11.1591 6.27375C11.3032 6.25281 11.4457 6.22167 11.5854 6.18059L6.47189 1.06864C6.67266 0.267533 6.88577 0.18176 7.44686 0.737778C9.3053 2.57607 11.1454 4.43518 13.0026 6.27469C13.3052 6.5772 13.3677 6.82094 13.0468 7.14191C11.1583 9.03099 9.27471 10.9274 7.37886 12.8116C7.25909 12.9383 7.09495 13.0138 6.92078 13.0223Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="feedback__navigation__hr">
            <div className="feedback__navigation__hr__line" />
          </div>
          <Swiper
            className="feedback__swiper"
            slidesPerView={1}
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              nextEl: ".feedback__next",
              prevEl: ".feedback__prev"
            }}
          >
            <SwiperSlide>
              <div className="feedback__about__content__swiper">
                <div className="feedback__about__content__swiper__content">
                  <div className="feedback__about__content__swiper__info">
                    {lang === "ar"
                      ? "نحن نتعاون مع الشركات الرائدة التي تعرف أن تكنولوجياها الرقمية يمكن أن تعمل بجد أكبر من أجلها، لكنها بحاجة إلى مساعدة للوصول إلى هناك. من الباحثين عن منازل إلى مالكي الحيوانات الأليفة، من اللاعبين إلى عشاق الرياضة، نحن نتبع نهجًا يركز على المستخدم في كل مشروع."
                      : "We partner with forward-thinking businesses that know their digital can work harder for them, but need help to get there. From house hunters to dog owners, gamers to sports fans, we take a user-first approach to every project."}
                  </div>
                  <div className="feedback__about__content__swiper__info__name">
                    Daniyel Halk
                  </div>
                  <div className="feedback__about__content__swiper__info__position">
                    {lang === "ar" ? "الرئيس التنفيذي، هالك" : "CEO, Halk"}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="feedback__about__content__swiper">
                <div className="feedback__about__content__swiper__content">
                  <div className="feedback__about__content__swiper__info">
                    {lang === "ar"
                      ? "نحن نتعاون مع الشركات الرائدة التي تعرف أن تكنولوجياها الرقمية يمكن أن تعمل بجد أكبر من أجلها، لكنها بحاجة إلى مساعدة للوصول إلى هناك. من الباحثين عن منازل إلى مالكي الحيوانات الأليفة، من اللاعبين إلى عشاق الرياضة، نحن نتبع نهجًا يركز على المستخدم في كل مشروع."
                      : "We partner with forward-thinking businesses that know their digital can work harder for them, but need help to get there. From house hunters to dog owners, gamers to sports fans, we take a user-first approach to every project."}
                  </div>
                  <div className="feedback__about__content__swiper__info__name">
                    Daniyel Halk
                  </div>
                  <div className="feedback__about__content__swiper__info__position">
                    {lang === "ar" ? "الرئيس التنفيذي، هالك" : "CEO, Halk"}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="feedback__about__content__icon">
            <img
              loading="lazy"
              src="/assets/feedbackicon.webp"
              alt="Feedback Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
