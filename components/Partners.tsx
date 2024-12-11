"use client";

import "@/styles/homesectionswiper.scss";
import "@/styles/ourpartner.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import useLanguage from "@/hooks/useLanguage";

const logos = [
  "/assets/pathnerlogo1.webp",
  "/assets/pathnerlogo2.webp",
  "/assets/pathnerlogo3.webp",
  "/assets/pathnerlogo4.webp",
  "/assets/pathnerlogo5.webp"
];

export default function Partners() {
  const [slidesPerView, setSlidesPerView] = useState(5.5);
  const [lang] = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWidth = () => {
      if (window.innerWidth > 1900) {
        setSlidesPerView(5.5);
      } else if (window.innerWidth > 1200) {
        setSlidesPerView(4.5);
      } else if (window.innerWidth > 950) {
        setSlidesPerView(3.5);
      } else if (window.innerWidth > 700) {
        setSlidesPerView(2.5);
      } else {
        setSlidesPerView(1.2);
      }
    };

    const debounceCheckWidth = debounce(checkWidth, 100);

    checkWidth();
    window.addEventListener("resize", debounceCheckWidth);
    return () => window.removeEventListener("resize", debounceCheckWidth);
  }, []);

  const debounce = (func: () => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };

  return (
    <div className="partners__swiper">
      <div className="partners__swiper__content">
        <div
          data-aos="fade-up"
          className="partners__swiper__content__heading heading__with__span"
        >
          {lang === "ar" ? "شركاؤنا" : "Our Partners"}
        </div>
        <div className="partners__swiper__content__swiper">
          <Swiper
            spaceBetween={2}
            slidesPerView={slidesPerView}
            freeMode={true}
            className="mySwiper"
            loop={true}
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index}>
                <img
                  loading="lazy"
                  className="partner__swiper__logos"
                  src={logo}
                  alt="partnerlogo"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
