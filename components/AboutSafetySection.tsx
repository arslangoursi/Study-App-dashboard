"use client";

import "@/styles/about.scss";

import Image from "next/image";
import useLanguage from "@/hooks/useLanguage";

function AboutSafetySection() {
  const [lang] = useLanguage();

  return (
    <div style={{ display: "none" }} className="div">
      <section className="about__safety">
        <div className="about__safety__row">
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
        </div>
        <div className="about__safety__row reverse">
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
          <div className="about__safety__row__entry">
            <div className="about__safety__row__entry__text">Safety .</div>
            <div className="about__safety__row__entry__text">Production .</div>
            <div className="about__safety__row__entry__text">Quality .</div>
            <div className="about__safety__row__entry__text">
              {lang === "ar" ? "الاعتمادية" : "Reliability"}
            </div>
          </div>
        </div>
      </section>
      <section className="about__our__message">
        <div className="about__our__message__image">
          <Image
            alt="man wearing construction hat"
            src="/assets/our_message.webp"
            height={400}
            width={400}
          />
        </div>
        <div className="about__our__message__vision">
          <div className="about__our__message__vision__card">
            <div className="about__our__message__vision__card__header">
              <div className="about__our__message__vision__card__header__logo">
                <Image
                  alt="logo"
                  src="/assets/registerleftimg.webp"
                  height={100}
                  width={100}
                />
              </div>
              <div className="about__our__message__vision__card__header__title">
                {lang === "ar" ? "رؤيتنا" : "Our Vision"}
              </div>
            </div>
            <div className="about__our__message__vision__card__text">
              {lang === "ar"
                ? "لخلق مجتمع حضري أيقوني يدمج بين العمارة الحديثة والطبيعة، ويقدم حياة فاخرة تنسجم مع المساحات الخضراء."
                : "To create an iconic urban community that blends modern architecture with nature, offering luxury living in harmony with green spaces."}
            </div>
            <div className="about__our__message__vision__card__images">
              <Image
                alt="Vision Image 1"
                src="/assets/our_vision_1.webp"
                height={100}
                width={100}
              />
              <Image
                alt="Vision Image 2"
                src="/assets/our_vision_2.webp"
                height={100}
                width={100}
              />
            </div>
          </div>
          <div className="about__our__message__vision__image">
            <Image
              alt="construction site"
              src="/assets/our_vision.webp"
              height={137}
              width={333}
            />
          </div>
        </div>
        <div className="about__our__message__innovative">
          <div className="about__our__message__innovative__heading">
            {lang === "ar" ? "Our" : "لنا"}{" "}
            <span>{lang === "ar" ? "رسالة" : "Message"}</span>
          </div>
          <div className="about__our__message__innovative__content">
            <div className="about__our__message__innovative__content__left">
              <div className="about__our__message__vision__card innovative__card">
                <div className="about__our__message__vision__card__header">
                  <div className="about__our__message__vision__card__header__logo">
                    <Image
                      alt="logo"
                      src="/assets/registerleftimg.webp"
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="about__our__message__vision__card__header__title">
                    {lang === "ar"
                      ? "التطوير الحضري المبتكر"
                      : "Innovative Urban Development"}{" "}
                  </div>
                </div>
                <div className="about__our__message__vision__card__text">
                  {lang === "ar"
                    ? "يجمع لاڤي يارد بين التصميم المتطور والاستدامة ليقدم أسلوب حياة فاخر، متماشيًا مع اتجاهات العقارات المستقبلية وفرص الاستثمار."
                    : "Lavie Yard integrates cutting-edge design and sustainability to offer a high-end lifestyle, aligning with future real estate trends and investment opportunities."}
                </div>
                <div className="about__our__message__vision__card__images">
                  <Image
                    alt="Vision Image 1"
                    src="/assets/our_vision_1.webp"
                    height={100}
                    width={100}
                  />
                  <Image
                    alt="Vision Image 2"
                    src="/assets/our_vision_2.webp"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
            <div className="about__our__message__innovative__content__right">
              <button>
                {lang === "ar" ? "تعلم المزيد" : "Learn More"}{" "}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="16.0835"
                    cy="15.5598"
                    r="14.8605"
                    stroke="#F5F5F5"
                    strokeWidth="1.17876"
                  />
                  <path
                    d="M20.8037 11.7024C20.8075 11.2674 20.458 10.9117 20.023 10.9079L12.9347 10.846C12.4997 10.8422 12.1441 11.1917 12.1403 11.6267C12.1365 12.0617 12.486 12.4174 12.921 12.4212L19.2217 12.4762L19.1666 18.7769C19.1628 19.2119 19.5124 19.5676 19.9474 19.5714C20.3823 19.5752 20.738 19.2256 20.7418 18.7907L20.8037 11.7024ZM12.7032 19.9861L20.5682 12.2573L19.4641 11.1337L11.5991 18.8625L12.7032 19.9861Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="about__leadership">
        <div className="about__our__message__innovative">
          <div className="about__our__message__innovative__heading">
            {lang === "ar" ? "القيادة" : "Leadership"}
          </div>
          <div className="about__our__message__innovative__content">
            <div className="about__our__message__innovative__content__right">
              <button>
                {lang === "ar" ? "تعرف أكثر" : "Learn More"}{" "}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="16.0835"
                    cy="15.5598"
                    r="14.8605"
                    stroke="#F5F5F5"
                    strokeWidth="1.17876"
                  />
                  <path
                    d="M20.8037 11.7024C20.8075 11.2674 20.458 10.9117 20.023 10.9079L12.9347 10.846C12.4997 10.8422 12.1441 11.1917 12.1403 11.6267C12.1365 12.0617 12.486 12.4174 12.921 12.4212L19.2217 12.4762L19.1666 18.7769C19.1628 19.2119 19.5124 19.5676 19.9474 19.5714C20.3823 19.5752 20.738 19.2256 20.7418 18.7907L20.8037 11.7024ZM12.7032 19.9861L20.5682 12.2573L19.4641 11.1337L11.5991 18.8625L12.7032 19.9861Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </button>
            </div>
            <div className="about__our__message__innovative__content__left">
              <div className="about__our__message__vision__card leadership__card">
                <div className="about__our__message__vision__card__header">
                  <div className="about__our__message__vision__card__header__logo">
                    <Image
                      alt="logo"
                      src="/assets/registerleftimg.webp"
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="about__our__message__vision__card__header__title">
                    {lang === "ar"
                      ? "ريادة معايير الحياة الجديدة"
                      : "Pioneering New Living Standards"}
                  </div>
                </div>
                <div className="about__our__message__vision__card__text">
                  {lang === "ar"
                    ? "لافيا يارد يعيد تعريف الفخامة الحضرية، ويصنع أسلوب حياة متطور وصديق للبيئة يعكس الطموحات الحديثة في قلب المملكة العربية السعودية. من خلال التخطيط الحضري المبتكر، يُتوقع أن يكون لافيا يارد حجر الزاوية في إعادة تشكيل مستقبل الحياة الحضرية."
                    : "Lavie Yard redefines urban luxury, crafting a sophisticated, eco-friendly lifestyle that mirrors modern aspirations in the heart of Saudi Arabia. Through innovative urban planning, Lavie Yard is set to be a cornerstone in reshaping the future of city living."}
                </div>
                <div className="about__our__message__vision__card__images">
                  <Image
                    alt="Vision Image 1"
                    src="/assets/our_vision_1.webp"
                    height={100}
                    width={100}
                  />
                  <Image
                    alt="Vision Image 2"
                    src="/assets/our_vision_2.webp"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about__leadership__image">
          <Image
            src="/assets/about__leadership.webp"
            alt="leadership image"
            height={500}
            width={400}
          />
          <div className="about__leadership__image__overlay">
            <div className="about__leadership__image__icon">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1365 6.88611C16.5737 7.11861 16.9394 7.46569 17.1945 7.89016C17.4495 8.31462 17.5842 8.80048 17.5842 9.29567C17.5842 9.79086 17.4495 10.2767 17.1945 10.7012C16.9394 11.1257 16.5737 11.4727 16.1365 11.7052L4.47372 18.0473C2.59577 19.0696 0.289062 17.7405 0.289062 15.6387V2.95361C0.289062 0.850811 2.59577 -0.477319 4.47372 0.543129L16.1365 6.88611Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutSafetySection;
