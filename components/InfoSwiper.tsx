"use client";

import "@/styles/realEstateSwiper.scss";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

export default function InfoSwiper() {
  return (
    <Swiper
      loop
      speed={3500}
      spaceBetween={30}
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
      className="info__swiper__card__container"
      autoplay={{ delay: 3500, waitForTransition: true }}
    >
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/aboutswiperimgnew1.webp"
          alt="hero1"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/aboutswiperimgnew2.webp"
          alt="hero2"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/aboutswiperimgnew4.webp"
          alt="hero4"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/infoswip6.webp"
          alt="hero6"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/infoswip7.webp"
          alt="hero7"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/infoswip8.webp"
          alt="hero8"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/infoswip9.webp"
          alt="hero9"
          width={800}
          height={900}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="info__image__swiper"
          src="/assets/infoswip10.webp"
          alt="hero10"
          width={800}
          height={900}
        />
      </SwiperSlide>
    </Swiper>
  );
}
