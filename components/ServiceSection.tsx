"use client";
import useLanguage from "@/hooks/useLanguage";
import "@/styles/servicesection.scss";

import Image from "next/image";

export default function ServiceSection() {
  const [lang] = useLanguage();
  return (
    <>
      <div className="service__section">
        <div className="service__section__content">
          <div className="service__section__content__heading__button">
            <div
              data-aos="fade-up"
              className="service__section__content__heading heading__with__span"
            >
              {lang === "ar" ? "متاح" : "Provided"}{" "}
              <span>{lang === "ar" ? "خدمات" : "Services"}</span>
            </div>
            <div className="service__section__content__button">
              <svg
                width="25"
                height="30"
                viewBox="0 0 25 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2565 13.4173C21.4169 13.5289 21.5501 13.6896 21.6428 13.8832C21.7354 14.0767 21.7842 14.2964 21.7842 14.52C21.7842 14.7435 21.7354 14.9632 21.6428 15.1567C21.5501 15.3503 21.4169 15.511 21.2565 15.6226L8.60923 24.4405C8.44903 24.5522 8.26732 24.611 8.08234 24.6111C7.89736 24.6111 7.71564 24.5523 7.55543 24.4406C7.39522 24.329 7.26217 24.1684 7.16964 23.975C7.07712 23.7816 7.02838 23.5621 7.02832 23.3388V5.70296C7.02838 5.47959 7.07712 5.26017 7.16964 5.06675C7.26217 4.87333 7.39522 4.71273 7.55543 4.60107C7.71564 4.48942 7.89736 4.43065 8.08234 4.43066C8.26732 4.43068 8.44903 4.48949 8.60923 4.60117L21.2565 13.4173Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="service__section__content__points">
            <div
              data-aos="fade-up"
              className="service__section__content__points__content"
            >
              <div className="service__section__content__points__content__point">
                {lang === "ar" ? "التصميم والبناء" : "Design and Construction"}{" "}
              </div>
              <div className="service__section__content__points__content__icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.4174"
                    cy="20.3676"
                    r="19.337"
                    stroke="#02021E"
                    strokeWidth="1.53384"
                  />
                  <path
                    d="M26.5589 15.3484C26.5638 14.7824 26.109 14.3196 25.543 14.3146L16.3194 14.2341C15.7534 14.2292 15.2906 14.684 15.2857 15.25C15.2807 15.816 15.7355 16.2788 16.3015 16.2838L24.5002 16.3554L24.4286 24.5541C24.4237 25.1201 24.8785 25.5829 25.4445 25.5878C26.0105 25.5928 26.4734 25.138 26.4783 24.572L26.5589 15.3484ZM16.0181 26.1275L26.2524 16.0705L24.8157 14.6085L14.5815 24.6655L16.0181 26.1275Z"
                    fill="#02021E"
                  />
                </svg>
              </div>
              <Image
                className="service__section__content__points__content__imgshow"
                src="/assets/alnakheel.webp"
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </div>
            <div className="service__section__content__points__hrline">
              <div
                data-aos="fade-up"
                className="service__section__content__points__hrline__line"
              />
            </div>
            <div
              data-aos="fade-up"
              className="service__section__content__points__content"
            >
              <div className="service__section__content__points__content__point">
                {lang === "ar"
                  ? "البحوث والاستشارات"
                  : "Research and Consultation"}{" "}
              </div>
              <div className="service__section__content__points__content__icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.4174"
                    cy="20.3676"
                    r="19.337"
                    stroke="#02021E"
                    strokeWidth="1.53384"
                  />
                  <path
                    d="M26.5589 15.3484C26.5638 14.7824 26.109 14.3196 25.543 14.3146L16.3194 14.2341C15.7534 14.2292 15.2906 14.684 15.2857 15.25C15.2807 15.816 15.7355 16.2788 16.3015 16.2838L24.5002 16.3554L24.4286 24.5541C24.4237 25.1201 24.8785 25.5829 25.4445 25.5878C26.0105 25.5928 26.4734 25.138 26.4783 24.572L26.5589 15.3484ZM16.0181 26.1275L26.2524 16.0705L24.8157 14.6085L14.5815 24.6655L16.0181 26.1275Z"
                    fill="#02021E"
                  />
                </svg>
              </div>
              <Image
                className="service__section__content__points__content__imgshow"
                src="/assets/alna.webp"
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </div>
            <div className="service__section__content__points__hrline">
              <div
                data-aos="fade-up"
                className="service__section__content__points__hrline__line"
              />
            </div>
            <div
              data-aos="fade-up"
              className="service__section__content__points__content"
            >
              <div className="service__section__content__points__content__point">
                {lang === "ar" ? "إدارةالأصول" : "Asset Management"}{" "}
              </div>
              <div className="service__section__content__points__content__icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.4174"
                    cy="20.3676"
                    r="19.337"
                    stroke="#02021E"
                    strokeWidth="1.53384"
                  />
                  <path
                    d="M26.5589 15.3484C26.5638 14.7824 26.109 14.3196 25.543 14.3146L16.3194 14.2341C15.7534 14.2292 15.2906 14.684 15.2857 15.25C15.2807 15.816 15.7355 16.2788 16.3015 16.2838L24.5002 16.3554L24.4286 24.5541C24.4237 25.1201 24.8785 25.5829 25.4445 25.5878C26.0105 25.5928 26.4734 25.138 26.4783 24.572L26.5589 15.3484ZM16.0181 26.1275L26.2524 16.0705L24.8157 14.6085L14.5815 24.6655L16.0181 26.1275Z"
                    fill="#02021E"
                  />
                </svg>
              </div>
              <Image
                className="service__section__content__points__content__imgshow"
                src="/assets/resort.webp"
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </div>
            <div className="service__section__content__points__hrline">
              <div
                data-aos="fade-up"
                className="service__section__content__points__hrline__line"
              />
            </div>
            <div
              data-aos="fade-up"
              className="service__section__content__points__content"
            >
              <div className="service__section__content__points__content__point">
                {lang === "ar" ? "التطوير العقاري" : "Real Estate Development"}
              </div>
              <div className="service__section__content__points__content__icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.4174"
                    cy="20.3676"
                    r="19.337"
                    stroke="#02021E"
                    strokeWidth="1.53384"
                  />
                  <path
                    d="M26.5589 15.3484C26.5638 14.7824 26.109 14.3196 25.543 14.3146L16.3194 14.2341C15.7534 14.2292 15.2906 14.684 15.2857 15.25C15.2807 15.816 15.7355 16.2788 16.3015 16.2838L24.5002 16.3554L24.4286 24.5541C24.4237 25.1201 24.8785 25.5829 25.4445 25.5878C26.0105 25.5928 26.4734 25.138 26.4783 24.572L26.5589 15.3484ZM16.0181 26.1275L26.2524 16.0705L24.8157 14.6085L14.5815 24.6655L16.0181 26.1275Z"
                    fill="#02021E"
                  />
                </svg>
              </div>
              <Image
                className="service__section__content__points__content__imgshow"
                src="/assets/liviayard.webp"
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
