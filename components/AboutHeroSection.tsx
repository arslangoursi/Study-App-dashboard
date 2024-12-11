"use client";

import "@/styles/aboutherosection.scss";

import useLanguage from "@/hooks/useLanguage";

export default function AboutHeroSection() {
  const [lang] = useLanguage();

  return (
    <div>
      <div className="about__hero">
        <div className="about__hero__content" style={{ gap: "1.5em" }}>
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1600"
            className="about__hero__content__title__heading"
          >
            <div
              className="about__hero__content__title__heading__growth"
              style={{
                color: "black"
              }}
            >
              {lang === "ar" ? "عش " : " LIVE"}{" "}
              {lang === "ar" ? "برفاهية" : "IN"} {lang === "ar" ? "" : "LUXURY"}
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1600"
            className="about__hero__content__title__growth"
            style={{
              direction: lang === "ar" ? "rtl" : "ltr"
            }}
          >
            <div className="about__hero__content__title__heading__growth">
              {lang === "ar" ? "عِش " : "LIVE"}
            </div>
            <img
              loading="lazy"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1700"
              className="about__hero__content__title__heading__growth__image"
              style={{
                marginBottom: lang === "ar" ? "-2em" : 0
              }}
              src={
                lang === "ar"
                  ? "/assets/zodarb.webp"
                  : "/assets/footerlogo.webp"
              }
              alt="hero"
            />
          </div>
          <div className="about__hero__content__title__info">
            {lang === "ar"
              ? "زود .. حيث تتناغم الرفاهية مع الابتكار.. بخبرة تمتد لأكثر من 20 عامًا عبر شركات متعددة المجالات، برزت زود لتجسد الرفاهية في عالم التطوير العقاري, حيث تُشكل فيها تجارب استثنائية لتصبح جزء لايتجزأ من حياتك."
              : "ZOOD, where innovation meets opulence. With a legacy spanning over 20 years and expertise across various sectors, ZOOD has redefined luxury in real estate, crafting extraordinary experiences that seamlessly blend into your lifestyle."}
          </div>
          <a
            className="about__hero__content__title__growth__button__a"
            href="https://drive.google.com/file/d/1vdQcspIUNL6nSpus0kDD6TvIH8uT5RaC/view?usp=drive_link"
          >
            <button className="about__hero__content__title__growth__button">
              {lang === "ar" ? "بروفايل زود" : "Download Profile"}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
