"use client";

import "@/styles/luxuryhome.scss";
import "@/styles/dream.scss";

import Image from "next/image";
import useLanguage from "@/hooks/useLanguage";

function Dream() {
  const [lang] = useLanguage();
  return (
    <section className="dream__section">
      <div className="luxury__home__content">
        <div className="luxury__home__content__left">
          <div className="luxury__home__content__left__image">
            <Image
              data-aos="fade-up"
              src="/assets/dream.webp"
              alt="luxury__home"
              width={536}
              height={713}
              quality={100}
            />
          </div>
        </div>
        <div className="luxury__home__content__right">
          <div className="luxury__home__content__right__content">
            <div
              data-aos="fade-up"
              className="luxury__home__content__right__content__name"
            >
              {lang === "ar"
                ? "جوجل بلاي ومتجر التطبيقات"
                : "Google Play and App Store"}
            </div>
            <div data-aos="fade-up" className="heading__with__span">
              {lang === "ar"
                ? "حمَّل التطبيق الآن"
                : "Download the Application Now"}{" "}
            </div>

            <div className="luxury__home__content__right__content__links">
              <div
                data-aos="fade-up"
                className="luxury__home__content__right__content__links__link"
              >
                <svg
                  width="24"
                  height="29"
                  viewBox="0 0 24 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.28631 1.51489L12.8773 14.1641L1.37251 26.93C1.18476 26.6569 1.0387 26.3512 0.940169 26.0253C0.888433 25.6561 0.888433 25.2803 0.940169 24.9111V3.187C0.905687 2.60405 1.02637 2.0211 1.28498 1.51489M17.8705 8.64753L14.0868 12.8182L2.63373 0.284056C3.00507 0.140902 3.40293 0.101055 3.79151 0.168943C4.40156 0.354896 4.98377 0.641205 5.51823 1.01459L15.8838 7.39751C16.5576 7.80041 17.214 8.22397 17.8705 8.64753ZM14.0882 15.5293L17.8533 19.6439L15.1239 21.3352L6.79669 26.4858C6.10706 26.9093 5.41478 27.3137 4.74107 27.7756C4.45286 27.9755 4.1296 28.1046 3.79293 28.1543C3.45626 28.2039 3.11394 28.1729 2.7889 28.0634L14.0882 15.5293ZM23.849 14.1641C23.8594 14.6804 23.7426 15.1899 23.5111 15.6374C23.2796 16.0849 22.9424 16.4533 22.5361 16.7026L19.4248 18.6241L15.3308 14.1641L19.442 9.62748C20.4964 10.2813 21.5335 10.9351 22.5692 11.5505C22.9825 11.8071 23.322 12.1889 23.5483 12.6515C23.7745 13.1141 23.8797 13.6386 23.849 14.1641Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <div
                  data-aos="fade-up"
                  className="luxury__home__content__right__content__links__link__text"
                >
                  {lang === "ar" ? "تحميل على" : " Download on the"}
                  <div> {lang === "ar" ? "جوجل بلاي" : "Google Play"} </div>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className="luxury__home__content__right__content__links__link"
              >
                <svg
                  width="23"
                  height="30"
                  viewBox="0 0 23 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.499 28.422C17.0722 29.9612 15.5144 29.7181 14.0148 28.9891C12.4278 28.2438 10.9719 28.2114 9.29764 28.9891C7.20114 29.9936 6.09465 29.7019 4.84258 28.422C-2.26223 20.2726 -1.21398 7.86228 6.85172 7.40864C8.81719 7.52205 10.1857 8.60755 11.3359 8.70476C13.0539 8.31592 14.699 7.19802 16.5335 7.34383C18.7319 7.53825 20.3916 8.51034 21.4836 10.2601C16.9411 13.2898 18.0185 19.9486 22.1824 21.8118C21.3525 24.242 20.2752 26.656 18.4844 28.4382L18.499 28.422ZM11.1903 7.31143C10.9719 3.69849 13.6071 0.717409 16.6354 0.425781C17.0576 4.60577 13.2286 7.71646 11.1903 7.31143Z"
                    fill="black"
                  />
                </svg>

                <div
                  data-aos="fade-up"
                  className="luxury__home__content__right__content__links__link__text"
                >
                  {lang === "ar" ? "تحميل على" : " Download on the"}
                  <div> {lang === "ar" ? "متجر أبل" : "Apple Store"} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dream;
