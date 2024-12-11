"use client";

import "@/styles/homesectionswiper.scss";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import SwiperCore from "swiper";
import useLanguage from "@/hooks/useLanguage";

export default function HomeSection() {
  const [lang] = useLanguage();
  const [swiperSlides, setSwiperSlides] = useState(2);
  const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkWidth = () => {
      if (window.innerWidth > 1900) {
        setSwiperSlides(2);
      } else if (window.innerWidth > 1200) {
        setSwiperSlides(2);
      } else if (window.innerWidth > 950) {
        setSwiperSlides(2);
      } else if (window.innerWidth > 700) {
        setSwiperSlides(2);
      } else {
        setSwiperSlides(1);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [swiperSlides]);

  return (
    <>
      <div className="home__section">
        <Swiper
          onSwiper={setMainSwiper}
          spaceBetween={0}
          navigation
          // loop={true}
          speed={1500}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2"
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            waitForTransition: true,
            reverseDirection: lang === "ar"
          }}
          slideToClickedSlide={true}
          watchSlidesProgress={true}
          preventInteractionOnTransition={true}
        >
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading">
                  <img
                    loading="lazy"
                    className="home__section__content__heading__img"
                    src="/assets/lavie.webp"
                    alt="laviayard"
                  />
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "يقدم مشروع لاڤي يارد تجربة شاملة تمزج بسلاسة بين المساحات السكنية الفاخرة والمناطق التجارية النابضة بالحياة،  مما يجعله الوجهة المثالية للعيش والعمل. بفضل تصميماته الحديثة، يعد مشروع لاڤي يارد الخيار الأمثل لمن يبحثون عن أسلوب حياة فاخر."
                    : "Lavie Yard offers a comprehensive experience that seamlessly blends luxurious residential spaces with vibrant commercial areas, making it the ideal destination for both living and working. With its modern designs, Lavie Yard is the perfect choice for those seeking a luxurious lifestyle."}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "الرياض" : "Riyadh"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "12,840 م² " : "12,840m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/liviayard.webp"
                  className="SwiperSlide__img"
                  alt="slide 1"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading heading__with__span animate-item">
                  ALNAKHEEL
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "تجربة معمارية فاخرة بانتظارك، ترقبوا!"
                    : "A luxurious architectural experience awaits you, Stay tuned!"}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "حي النخيل" : "District Nakheel Al"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "73,891 م²" : "73,891m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/alnakheel.webp"
                  className="SwiperSlide__img"
                  alt="slide 2"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading heading__with__span animate-item">
                  ALNARJIS
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "فرصة فريدة لامتلاك قطعة من الفخامة، استثمر في زود النرجس اليوم!"
                    : "A unique opportunity to own a piece of luxury, Invest in ZOOD Al Narjis today!"}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "حي النرجس" : "Al Narjis District"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "38,850 م²" : "38,850m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/alna.webp"
                  className="SwiperSlide__img"
                  alt="slide 3"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading heading__with__span animate-item">
                  ZOOD COLLECTION RESORTS
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "اكتشف عالماً من الأناقة التي لا مثيل لها. تلبي مساكننا احتياجات أولئك الذين يبحثون عن تجربة معيشية استثنائية حقًا."
                    : "Discover a world of unparalleled elegance. Our residences cater to those who seek a truly exceptional living experience."}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "ملهم" : "Malham"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "635,404 م²" : "635,404m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/resort.webp"
                  className="SwiperSlide__img"
                  alt="slide 4"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading heading__with__span animate-item">
                  OPAL
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "مجموعة من الفلل الفاخرة تقع في حي الملقا بالرياض على مساحة 6,780 متر مربع. تم تصميم كل فيلا بشكل فريد بأناقة راقية، مما يوفر أسلوبًا جديدًا ومميزًا للسكن، ويضع معيارًا جديدًا للرقي للالمساحة"
                    : "A collection of luxurious villas located in the Al Malqa district of Riyadh  on a 6,780 square meter plot. Each villa is uniquely designed with a  refined elegance, offering a fresh, distinctive approach to the Residence,  setting a new standard of sophistication for the area"}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "الملقا " : "Al Malqa"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "6,780 م²" : "6,780m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/opal.webp"
                  className="SwiperSlide__img"
                  alt="slide 5"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__swiper__main">
              <div className="home__section__content">
                <div className="home__section__content__heading heading__with__span animate-item">
                  NORTH VIEW
                </div>
                <div className="home__section__content__info animate-item">
                  {lang === "ar"
                    ? "احجز مكانك في المستقبل، نورث فيو في انتظارك!"
                    : "Reserve your place in the future, North View is waiting for you!"}
                </div>
              </div>
              <div className="hero__swiper__main__location__area">
                <div className="hero__swiper__main__location__area__content">
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "حي الياسمين" : "Al-Yasmine District"}
                    </div>
                  </div>
                  <div className="hero__swiper__main__location__area__content__location animate-item">
                    <div className="hero__swiper__main__location__area__content__heading">
                      {lang === "ar" ? "المساحة" : "Area"}
                    </div>
                    <div className="hero__swiper__main__location__area__content__info">
                      {lang === "ar" ? "14,430 م²" : "14,430m²"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="SwiperSlide__img__main">
                <img
                  loading="lazy"
                  src="/assets/northimg.webp"
                  className="SwiperSlide__img"
                  alt="slide 5"
                />
                <div className="SwiperSlide__img__main__overlay" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper__two">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={swiperSlides}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: false
            }}
            // loop={true}
            speed={1500}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              waitForTransition: true,
              reverseDirection: lang === "ar"
            }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="home__swiper__two"
            slideToClickedSlide={true}
            preventInteractionOnTransition={true}
            onSlideChange={(swiper) => {
              if (mainSwiper && mainSwiper.slideToLoop) {
                mainSwiper.slideToLoop(swiper.realIndex, 1000);
              }
            }}
            observer={true}
            observeParents={true}
          >
            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/liviayard.webp"
                    alt="Thumb 1"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        Lavie Yard
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/alnakheel.webp"
                    alt="Thumb 2"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        ZOOD ALNAKHEEL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/alna.webp"
                    alt="Thumb 3"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        Al Narjis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/resort.webp"
                    alt="Thumb 6"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        ZOOD Collection Resort
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/opal.webp"
                    alt="Thumb 6"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        OPAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="home__swiper__two__main">
                <div className="home__swiper__two__main__content">
                  <img
                    loading="lazy"
                    className="swiper__two__img"
                    src="/assets/northimg.webp"
                    alt="Thumb 4"
                  />
                  <div className="home__swiper__two__main__content__all">
                    <div className="home__swiper__two__main__content__heading__icon">
                      <div className="home__swiper__two__main__content__heading">
                        NORTH VIEW
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
