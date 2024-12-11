"use client";

import "@/styles/realEstateSwiper.scss";
import swiperData from "@/data/our_projects.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { use, useEffect, useState } from "react";

import SwiperCardIcon from "@/icons/SwiperCardIcon";
import useLanguage from "@/hooks/useLanguage";
import Link from "next/link";

interface Project {
  number: string;
  picture: string | null;
  name: {
    en: string | null;
    ar: string | null;
  } | null;
  description: {
    en: string | null;
    ar: string | null;
  } | null;
  status: string;
}

export default function OurProjects({
  projectsPromise
}: {
  projectsPromise: Promise<Project[]>;
}) {
  const [lang] = useLanguage();
  const projects = use(projectsPromise);

  const filters = [
    { key: "ON_SALE", value: lang === "ar" ? "بدأ البيع" : "Sales" },
    { key: "SOLD_OUT", value: lang === "ar" ? "مباع" : "Sold Out" },
    { key: "COMING_SOON", value: lang === "ar" ? "قريباً" : "Coming" }
  ];

  const [activeFilter, setActiveFilter] = useState(filters[0].key);

  const [swiperSlides, setSwiperSlides] = useState(4);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWidth = () => {
      if (window.innerWidth > 1600) {
        setSwiperSlides(3.5);
      } else if (window.innerWidth > 1200) {
        setSwiperSlides(3);
      } else if (window.innerWidth > 950) {
        setSwiperSlides(2.2);
      } else if (window.innerWidth > 700) {
        setSwiperSlides(2);
      } else {
        setSwiperSlides(1.2);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const projectsChanged = projects.map((project) => ({
    ...project,
    status: "SOLD_OUT"
  }));

  const slides = [...projectsChanged, ...swiperData];

  return (
    <>
      <div className="real__estate__container">
        <div className="real__estate__content">
          <div className="real__estate__content__title heading__with__span">
            {lang === "ar" ? "مشاريعنا" : "Our Project"}
          </div>
        </div>
        <div className="real__estate__filter">
          {filters.map((filter) => (
            <div
              key={filter.key}
              className={`real__estate__filter__entry ${
                activeFilter === filter.key ? "active" : ""
              }`}
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.value}
            </div>
          ))}
        </div>
      </div>
      <div className="real__estate__container__swiper">
        <Swiper
          slidesPerView={swiperSlides}
          spaceBetween={30}
          centeredSlides={true}
          className="real__swiper__card__container"
        >
          {slides
            .filter((slide) => slide.status === activeFilter)
            .map((slide, index) => (
              <SwiperSlide key={index}>
                <SwiperCard data={slide} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

function SwiperCard({ data }: { data: any }) {
  const [lang] = useLanguage();

  return (
    <div className="real__swiper__card__col__wrapper">
      <div
        className="real__swiper__card__col"
        suppressHydrationWarning
        data-aos="fade-up"
      >
        <img
          loading="lazy"
          src={data.picture || ""}
          className="real__swiper__card__img__image"
          alt={lang === "ar" ? data.name?.ar || "" : data.name?.en || ""}
          width={400}
          height={300}
        />
        <div className="real__swiper__card__row">
          <div className="real__swiper__card__content">
            <div className="real__swiper__card__heading">
              {lang === "ar" ? data.name?.ar : data.name?.en}
            </div>
            <div className="real__swiper__card__subheading">
              {lang === "ar" ? data.description?.ar : data.description?.en}
            </div>
          </div>
          {data.number && (
            <Link
              href={"/projects/" + data.number}
              className="real__swiper__card__row__svg"
              title="View Project"
            >
              <SwiperCardIcon />
            </Link>
          )}
          {data.link &&
            (data.link.includes("http") ? (
              <a
                href={data.link}
                target="_blank"
                className="real__swiper__card__row__svg"
                title="View Project"
              >
                <SwiperCardIcon />
              </a>
            ) : (
              <Link
                href={data.link}
                className="real__swiper__card__row__svg"
                title="View Project"
              >
                <SwiperCardIcon />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
