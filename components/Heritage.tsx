"use client";

import "@/styles/heritage.scss";

import Image from "next/image";
import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";

export default function Heritage() {
  const [lang] = useLanguage();
  return (
    <div className="heritage__section">
      <div className="heritage__section__content">
        <div className="heritage__section__content__left">
          <div className="heritage__section__content__left__content">
            <div
              data-aos="fade-up"
              className="heritage__section__content__left__content__heading heading__with__span"
            >
              {lang === "ar"
                ? "تجربة فاخرة في فلل أوبال"
                : "Luxury at Opal Villas"}
            </div>
            <div
              data-aos="fade-up"
              className="heritage__section__content__left__content__info"
            >
              {lang === "ar"
                ? "مجموعة من الفلل الفاخرة تقع في حي الملقا بالرياض على قطعة أرض مساحتها 6,780 متر مربع. كل فيلا مصممة بشكل فريد برقي، تقدم نهجاً جديداً ومميًزا للمسكن، مما يضع معياًرا جديدًا للرقي في المساحة."
                : "Opal Residential Villas, located in Riyadh Al Malqa district, offers luxurious, uniquely designed villas that redefine elegance and comfort. Experience exclusive living with top-tier amenities for an unparalleled lifestyle"}
            </div>
            <div className="form__content__right__content__form__button">
              <Link href="/opal" target="_blank">
                <button
                  data-aos="fade-up"
                  className="form__content__right__content__form__button__button"
                >
                  {lang === "ar" ? "عرض الموقع" : " Registration"}
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
              </Link>
            </div>
          </div>
        </div>
        <div className="heritage__section__content__right">
          <div
            data-aos="fade-up"
            className="heritage__section__content__right__content"
          >
            <Image
              src="/assets/Heritagesectionimg.webp"
              alt="heritage"
              width={500}
              height={610}
              quality={100}
            />
          </div>
        </div>
        <div className="heritage__section__content__bottom">
          <svg
            width="438"
            height="647"
            viewBox="0 0 438 647"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1012_52"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="438"
              height="647"
            >
              <rect width="438" height="647" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1012_52)">
              <circle
                cx="327.629"
                cy="321.628"
                r="191.627"
                stroke="#0C1F35"
                strokeWidth="0.75"
              />
              <circle
                opacity="0.5"
                cx="327.627"
                cy="321.628"
                r="255.683"
                stroke="#0C1F35"
                strokeWidth="0.75"
              />
              <circle
                opacity="0.3"
                cx="327.628"
                cy="321.628"
                r="319.253"
                stroke="#0C1F35"
                strokeWidth="0.75"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
