"use client";

import "@/styles/luxuryhome.scss";

import Image from "next/image";
import useLanguage from "@/hooks/useLanguage";

function LuxuryHome() {
  const [lang] = useLanguage();

  return (
    <section className="luxury__home">
      <div className="luxury__home__content">
        <div className="luxury__home__content__left">
          <div
            data-aos="fade-up"
            className="luxury__home__content__left__image"
          >
            <Image
              src="/assets/luxurysectionimg.webp"
              alt="luxury__home"
              width={569}
              height={815}
              quality={100}
            />
          </div>
        </div>
        <div className="luxury__home__content__right">
          <div className="luxury__home__content__right__content  ">
            <div
              data-aos="fade-up"
              className="luxury__home__content__right__heading heading__with__span"
            >
              {lang === "ar" ? "مشروع " : "In the"}{" "}
              <span>{lang === "ar" ? "لاڤي يارد" : "Lavie Yard"} </span>{" "}
            </div>
            <div
              data-aos="fade-up"
              className="luxury__home__content__right__content__info info"
            >
              {lang === "ar"
                ? "تتميز واجهات لاڤي يارد السلسة والحديثة بالاحترافية الدقيقة، مما يخلق جوا راقيا يوفر هذا المشروع بيئة معيشية مرموقة تعزز الفخامة وتناسب أسلوب حياتك تماماً"
                : "To live your life in an atmosphere of tranquility and luxury within a harmonious and modern social environment designed to suit Fa new lifestyle that today has become within our reach."}
            </div>
            <div className="form__content__right__content__form__button">
              <a
                className="form__content__right__button__link"
                href="https://lavieyard.com/"
                target="_blank"
              >
                <button
                  data-aos="fade-up"
                  className="form__content__right__content__form__button__button"
                >
                  {lang === "ar" ? "عرض الموقع" : "View Website"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8054 11.9169C11.0766 12.0482 10.8687 11.7199 10.8774 11.0173C10.9102 8.60986 10.8949 6.21551 10.8774 3.8146C10.8774 3.46442 10.9737 3.09673 10.733 2.67652C10.0195 3.06391 9.54673 3.6986 9.00177 4.237C6.55052 6.65323 4.11167 9.0826 1.68523 11.5251C1.32192 11.8928 0.934532 12.3787 0.501186 11.884C0.109424 11.4463 0.623747 11.0086 0.965171 10.6715C3.8308 7.81466 6.69716 4.95779 9.56424 2.10092C9.6743 1.95349 9.77376 1.79843 9.86189 1.63693H0.726613C0.190402 0.741785 0.304211 0.474777 1.30222 0.4704C4.60484 0.452891 7.90965 0.470398 11.2123 0.455078C11.7529 0.455078 12.0264 0.617039 12.0264 1.19046C12.0264 4.5653 12.0374 7.94233 12.0264 11.3194C12.0326 11.5396 11.9534 11.7537 11.8054 11.9169Z"
                      fill="#FFF6F2"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LuxuryHome;
