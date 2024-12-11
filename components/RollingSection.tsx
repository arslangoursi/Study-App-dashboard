"use client";

import "@/styles/community.scss";

import CountUpWhenInView from "./CountUpWhenInView";
import useLanguage from "@/hooks/useLanguage";

function Community() {
  const [lang] = useLanguage();
  return (
    <>
      <div className="community__rolling">
        <div className="community__rolling__content">
          <div className="community__rolling__content__line">
            <div
              data-aos="fade-up"
              className="community__rolling__content__line__line"
            />
          </div>
          <div className="community__rolling__content__rolling">
            <div
              data-aos="fade-up"
              className="community__rolling__content__rolling__content"
            >
              <div className="community__rolling__content__rolling__content__heading">
                {lang === "ar" ? "الوحدات التجارية" : "Commercial unit"}
              </div>
              <div className="community__rolling__content__rolling__content__counting">
                <CountUpWhenInView start={0} end={15000} duration={3} />
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="community__rolling__content__rolling__content"
            >
              <div className="community__rolling__content__rolling__content__heading">
                {lang === "ar" ? "المساحات المطورة" : "Developed spaces"}
              </div>
              <div className="community__rolling__content__rolling__content__counting">
                <CountUpWhenInView start={0} end={42000000} duration={3} />
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="community__rolling__content__rolling__content"
            >
              <div className="community__rolling__content__rolling__content__heading">
                {lang === "ar" ? "الوحدات السكنية" : " Residential Units"}
              </div>
              <div className="community__rolling__content__rolling__content__counting">
                <CountUpWhenInView start={0} end={35000} duration={3} />
              </div>
            </div>
          </div>
          <div className="community__rolling__content__line">
            <div
              data-aos="fade-up"
              className="community__rolling__content__line__line"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
