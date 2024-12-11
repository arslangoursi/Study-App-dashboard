"use client";

import "@/styles/exploreprojectsection.scss";

import { interestSelectedOptionsAtom } from "@/constants/state";
import { useAtom } from "jotai";
import useLanguage from "@/hooks/useLanguage";

export default function ExploreProjectSection() {
  const [lang] = useLanguage();
  const [, setSelectedOptions] = useAtom(interestSelectedOptionsAtom);

  return (
    <div>
      <div className="explore__project__section">
        <div className="explore__project__section__content">
          <div
            data-aos="fade-up"
            className="explore__project__section__content__heading heading__with__span"
          >
            {lang === "ar" ? "استكشف " : "Explore"}{" "}
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="27.9735" cy="27.9735" r="27.9735" fill="#C9892E" />
              <path
                d="M27.0752 29.865C27.0752 30.7482 27.0677 31.632 27.08 32.5152C27.0834 32.7531 27.0282 32.8538 26.7613 32.8392C26.3765 32.8173 25.9897 32.8273 25.6036 32.8359C25.4443 32.8399 25.3633 32.7942 25.3095 32.6371C25.1508 32.1786 24.8328 31.8507 24.4038 31.6042C22.512 30.5084 21.3394 28.8997 20.9533 26.8001C20.6306 25.0754 20.9963 23.296 21.9757 21.8246C22.9551 20.3532 24.4745 19.3008 26.224 18.8819C30.1375 17.9252 33.9557 20.2156 34.9097 24.0094C35.6302 26.8703 34.3343 29.9313 31.718 31.5002C31.2182 31.7997 30.7899 32.1336 30.6122 32.6961C30.5638 32.8485 30.4555 32.8286 30.3452 32.8286C29.9591 32.8286 29.5723 32.814 29.1876 32.8346C28.9254 32.8491 28.8634 32.7571 28.8655 32.5146C28.8757 31.0463 28.8702 29.5775 28.8702 28.1086C28.8702 27.8104 28.8839 27.5123 28.8662 27.2148C28.8519 26.9763 28.9179 26.861 29.1842 26.8921C29.3314 26.9047 29.4795 26.9047 29.6268 26.8921C30.3759 26.8497 30.8988 26.2958 30.8818 25.5584C30.8746 25.2246 30.7342 24.9066 30.4903 24.6717C30.2464 24.4367 29.9182 24.3033 29.575 24.2996C29.2311 24.2998 28.9001 24.427 28.6488 24.6555C28.3975 24.884 28.2447 25.1968 28.2213 25.5306C28.2117 25.6851 28.2117 25.8399 28.2213 25.9944C28.2322 26.1819 28.2138 26.2972 27.9584 26.2952C27.7031 26.2932 27.7283 26.1541 27.7276 25.9977C27.7276 25.7327 27.7466 25.4677 27.6595 25.2106C27.4552 24.5997 26.796 24.1995 26.1716 24.3168C25.4572 24.4493 25.0255 25.0006 25.0691 25.7214C25.0907 26.0266 25.2258 26.3137 25.4491 26.529C25.6724 26.7444 25.9687 26.8732 26.2826 26.8915C26.3275 26.8948 26.3731 26.8961 26.4188 26.8974C27.0759 26.916 27.0759 26.916 27.0759 27.5448L27.0752 29.865Z"
                fill="#FFFDFD"
              />
              <path
                d="M29.9613 35.9556C29.6344 36.6943 29.0951 37.1045 28.3345 37.2489C27.4553 37.4159 26.4639 36.9402 26.0832 36.1776C26.026 36.0629 25.9429 35.953 26.1826 35.9536C27.4281 35.9602 28.6695 35.9556 29.9613 35.9556Z"
                fill="#FFFDFD"
              />
              <path
                d="M27.9983 33.4426C28.7569 33.4426 29.5162 33.4559 30.2748 33.4353C30.5826 33.4274 30.5254 33.6069 30.5261 33.7745C30.5268 33.9422 30.5792 34.1138 30.2741 34.1111C28.7342 34.0957 27.1941 34.0957 25.6538 34.1111C25.3637 34.1111 25.4141 33.9481 25.4209 33.7918C25.4277 33.6354 25.3337 33.4313 25.6544 33.438C26.4355 33.4559 27.2173 33.4426 27.9983 33.4426Z"
                fill="#FFFDFD"
              />
              <path
                d="M27.9935 34.7486C28.7187 34.7486 29.4447 34.7446 30.1726 34.7532C30.2904 34.7532 30.4831 34.6651 30.5172 34.8473C30.5355 34.9412 30.5179 35.0383 30.4678 35.1204C30.4176 35.2026 30.3383 35.264 30.2448 35.2932C30.1366 35.3267 30.0231 35.3411 29.9098 35.3356C28.6173 35.3387 27.3248 35.3387 26.0323 35.3356C25.8117 35.3356 25.5999 35.3197 25.4828 35.0911C25.3575 34.8473 25.4086 34.7493 25.6823 34.7479C26.4511 34.7466 27.2233 34.7493 27.9935 34.7486Z"
                fill="#FFFDFD"
              />
              <path
                d="M27.7278 29.8297C27.7278 28.9472 27.7278 28.0646 27.7278 27.1795C27.7278 27.0099 27.7278 26.8866 27.9696 26.888C28.1964 26.888 28.2243 26.984 28.2236 27.1682C28.2186 28.9664 28.2186 30.7643 28.2236 32.562C28.2236 32.7522 28.1841 32.8343 27.9635 32.8363C27.7142 32.8363 27.7272 32.7038 27.7278 32.5408C27.7292 31.6384 27.7278 30.7341 27.7278 29.8297Z"
                fill="#FFFDFD"
              />
              <path
                d="M27.0653 25.8578C26.9972 25.9638 27.2226 26.2176 26.9291 26.2805C26.3353 26.4064 25.8634 26.2143 25.7238 25.8167C25.6727 25.664 25.6788 25.4986 25.7411 25.3499C25.8035 25.2012 25.918 25.0788 26.0643 25.0044C26.1632 24.9518 26.2741 24.924 26.3868 24.9234C26.4996 24.9227 26.6107 24.9494 26.7103 25.0008C26.8099 25.0523 26.8948 25.1271 26.9573 25.2184C27.0199 25.3097 27.0581 25.4146 27.0687 25.5239C27.0735 25.6186 27.0653 25.7187 27.0653 25.8578Z"
                fill="#FFFDFD"
              />
              <path
                d="M28.8701 25.795C28.8742 25.1497 29.2378 24.8012 29.7499 24.9522C29.9094 24.9937 30.0482 25.0896 30.1408 25.2225C30.2335 25.3553 30.2739 25.5163 30.2545 25.6757C30.2352 25.8346 30.1597 25.982 30.0411 26.0928C29.9226 26.2036 29.7681 26.2709 29.6042 26.2833C29.5253 26.2873 29.4462 26.2873 29.3672 26.2833C28.8068 26.274 28.879 26.3787 28.8701 25.795Z"
                fill="#FFFDFD"
              />
            </svg>
            <span data-aos="fade-up">
              {lang === "ar" ? "مشاريعنا" : "Our Projects"}
            </span>
          </div>
          <div className="explore__project__section__content__cards">
            <div
              data-aos="fade-up"
              data-aos-delay="60"
              data-aos-duration="1300"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img
                    loading="lazy"
                    src="/assets/Lieviayard.webp"
                    alt="explore1"
                  />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  LA VIE YARD
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "أستمتع ب حياة متكاملة لك و أطفالك ب مجتمع متكاملة الخدمات ب طريق العيا بحي الصحافه ب الرياض"
                    : "Leveraging ZOOD Real Estate’s legacy to lead in real estate development with a renewed vision."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/1v99mrMbNGzCBR2NjXqhv-EZceN99y6_L/view?usp=drive_link"
                    target="_blank"
                    rel="noopener Lavie Yard"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="Lavie Yard"
                    onClick={() => setSelectedOptions(["LA VIE YARD"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="70"
              data-aos-duration="1500"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img loading="lazy" src="/assets/opal.webp" alt="explore1" />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  OPAL
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "فلل فاخرة و أنيقة ب حي الملقا ب الرياض تعيد تعريف الرقي علي مساحة 6780 متر"
                    : "Luxurious, elegant villas in Riyadh’s Al Malqa district, redefining sophistication on a 6,780 sqm plot."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/116hd--g6DBFX1XAvRQqPDoTfydtyeGUV/view?usp=drive_link"
                    target="_blank"
                    rel="noopener Opal"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="Opal"
                    onClick={() => setSelectedOptions(["OPAL"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="1800"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img
                    loading="lazy"
                    src="/assets/northview.webp"
                    alt="explore1"
                  />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  NORTH VIEW
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "مشروع متعدد الأستخدامات ل حياة متكاملة يضم وحدات سكنية و مكاتب إدارية و غرف فندقية علي طريق الملك سلمان"
                    : "A modern mixed-use development with residences, offices, hotels, and facilities in Yasmin District."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/1HXbLu4Fx0AuAHU7kXCleG48kerXka3vt/view?usp=drive_link"
                    target="_blank"
                    rel="noopener Northview"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="Northview"
                    onClick={() => setSelectedOptions(["NORTH VIEW"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="1800"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img
                    loading="lazy"
                    src="/assets/resort.webp"
                    alt="explore1"
                  />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  ZOOD COLLECTION RESORTS
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "منتجعات فاخرة ل راحتك تقدم تجربة أستجمام لا تتوقف عند حدود العقار و يلبي طموحاتك"
                    : "A luxury development featuring hotels, residences, and offices in Al Narjis District."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/14ouzkbeJO5418nND7XTiZGL61gWblle0/view?usp=drive_link"
                    target="_blank"
                    rel="noopener ZOOD Collection Resorts"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="ZOOD Collection Resorts"
                    onClick={() =>
                      setSelectedOptions(["ZOOD COLLECTION RESORTS"])
                    }
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="1800"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img loading="lazy" src="/assets/alna.webp" alt="explore1" />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  ZOOD ALNARJIS
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "ب طريق الملك سلمان نشيد أضخم مشروعات زود ب سكن راقي و وحدات إدارية و تجارية و غرف فندقية علي مساحة 38 الف متر"
                    : "A luxurious architectural project offering premium hotels, residences, and offices in Al Nakheel District."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/1lQ0_dth9CaaELbj0ILlrFMs4pzM0CNyu/view?usp=drive_link"
                    target="_blank"
                    rel="noopener ZOOD Al Narjis"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="ZOOD Al Narjis"
                    onClick={() => setSelectedOptions(["ZOOD ALNARJIS"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="1800"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img
                    loading="lazy"
                    src="/assets/alnakheel.webp"
                    alt="explore1"
                  />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  ZOOD ALNAKHEEL
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "مشروع به كل جوانب الحياة ب توفير وحدات سكنية و مكاتب إداريةو غرف فندقية ب قلب الرياض النابض"
                    : "Your chance to own premium spaces with hotels, residences, and offices in Al Narjis District."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/file/d/1x7QDRp_yXJC3awnoPHRykGFkigNH802a/view?usp=drive_link"
                    target="_blank"
                    rel="noopener ZOOD Al Nakheel"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="ZOOD Al Nakheel"
                    onClick={() => setSelectedOptions(["ZOOD ALNAKHEEL"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="80"
              data-aos-duration="1800"
              className="explore__project__section__content__cards__card"
            >
              <div className="explore__project__section__content__cards__card__content">
                <div className="explore__project__section__content__cards__card__content__image">
                  <img loading="lazy" src="/assets/oasis.webp" alt="explore1" />
                </div>
                <div className="explore__project__section__content__cards__card__content__heading">
                  MALHAM OASIS
                </div>
                <div className="explore__project__section__content__cards__card__content__info">
                  {lang === "ar"
                    ? "لكل عاصمة امتداد ريفي يعتبر متنفساً لسكانها ، وريف الرياض هو ضواحيها الهادئة وجغرافيتها الطبيعية ، التي تربطها بمحافظات ومناطق شمالها الغربي ."
                    : "Your chance to own premium spaces with hotels, residences, and offices in   MALHAM OASIS District."}
                </div>
                <div className="explore__project__section__content__cards__card__content__buttons">
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="https://drive.google.com/drive/folders/1NgaEcCBxpEQ4dSKRdbrUPIox3fjG_QSy?usp=sharing"
                    target="_blank"
                    rel="noopener MALHAM OASIS"
                  >
                    {lang === "ar" ? "عرض" : "Download"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                  <a
                    className="explore__project__section__content__cards__card__content__buttons__download"
                    href="#form"
                    rel="MALHAM OASIS"
                    onClick={() => setSelectedOptions(["MALHAM OASIS"])}
                  >
                    {lang === "ar" ? "سجل إهتمامك" : "Register"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-external-link"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
