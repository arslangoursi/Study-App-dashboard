"use client";

import "@/styles/feedback.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Navigation } from "swiper/modules";

export default function FeedBack() {
  const [swiperSlides, setSwiperSlides] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWidth = () => {
      if (window.innerWidth > 1600) {
        setSwiperSlides(3);
      } else if (window.innerWidth > 1200) {
        setSwiperSlides(2.8);
      } else if (window.innerWidth > 950) {
        setSwiperSlides(2.5);
      } else if (window.innerWidth > 700) {
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
    <>
      <div className="feedback__warper__main">
        <div className="feedback__warper">
          <div className="feedback__warper__header__svg">
            <svg
              width="19"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.874 11.0697C24.1489 11.0697 25.2277 12.1485 25.2277 13.4234V19.6998C25.2277 21.0238 24.1489 22.0535 22.874 22.0535H16.5976C15.2736 22.0535 14.2439 21.0238 14.2439 19.6998V7.93148C14.2439 3.61643 17.7254 0.0859275 22.0895 0.0859275H22.4818C23.1192 0.0859275 23.6586 0.62531 23.6586 1.26276V3.61643C23.6586 4.30291 23.1192 4.79326 22.4818 4.79326H22.0895C20.3242 4.79326 18.9513 6.21527 18.9513 7.93148V11.0697H22.874ZM8.75203 11.0697C10.0269 11.0697 11.1057 12.1485 11.1057 13.4234V19.6998C11.1057 21.0238 10.0269 22.0535 8.75203 22.0535H2.47558C1.15164 22.0535 0.121914 21.0238 0.121914 19.6998V7.93148C0.121914 3.61643 3.60338 0.0859275 7.96747 0.0859275H8.35975C8.9972 0.0859275 9.53658 0.62531 9.53658 1.26276V3.61643C9.53658 4.30291 8.9972 4.79326 8.35975 4.79326H7.96747C6.20222 4.79326 4.82925 6.21527 4.82925 7.93148V11.0697H8.75203Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="feedback__warper__header">
            <div
              data-aos="fade-up"
              className="feedback__warper__heading heading__with__span"
            >
              Customer <span>Feedback </span>
            </div>
            <div data-aos="fade-up" className="feedback__navigation">
              <button className="feedback__navigation__entry feedback__prev">
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
              <button className="feedback__navigation__entry feedback__next">
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
          </div>
        </div>
        <div className="feedback__warper__bg__side" />
        <Swiper
          data-aos="fade-up"
          className="feedback__swiper"
          slidesPerView={swiperSlides}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={{
            nextEl: ".feedback__next",
            prevEl: ".feedback__prev"
          }}
        >
          <SwiperSlide>
            <FeedBackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackCard />
          </SwiperSlide>
          <SwiperSlide>
            <FeedBackCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

function FeedBackCard() {
  return (
    <>
      <div className="feedback__swiper__card">
        <div className="feedback__swiper__card__heading">
          Great Services with Good Quality
        </div>
        <div className="feedback__swiper__card__subheading">
          I truly have nothing but the highest praise and appreciation for all
          that you did for us. Saving me on the video montage projection was
          huge, and even more important the amazing pictures.
        </div>
        <div className="feedback__swiper__card__bottom">
          <div className="feedback__swiper__avatar">
            <Image src="/avatar.webp" alt="zood" width={50} height={50} />
          </div>
          <div className="feedback__swiper__content">
            <div className="feedback__swiper__name">Priscilla Makalu</div>
            <div className="feedback__swiper__client">EbayScape Client</div>
          </div>
        </div>
      </div>
    </>
  );
}
