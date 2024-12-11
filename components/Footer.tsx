"use client";

import "@/styles/footer.scss";

import Image from "next/image";
import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";

function Footer() {
  const [lang] = useLanguage();
  const pathname = usePathname();

  return (
    pathname !== "/map" &&
    pathname !== "/opal" &&
    pathname !== "/scan" && (
      <div className="footer">
        <div className="footer__content">
          <div className="footer__content__header">
            <div className="footer__content__header__address" />
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="footer__content__header__logo"
            >
              <Image
                src="/assets/footerlogo.webp"
                height={60}
                width={165}
                quality={100}
                alt="logo"
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
              className="footer__content__header__contact"
            />
          </div>
          <div className="footer__content__get">
            <Link href="/contactUs" className="get__in__touch">
              {lang === "ar" ? "اتصل بنا" : "Get In Touch"}
            </Link>
            <div className="footer__content__get__heading">
              <div>{lang === "ar" ? " عش برفاهية " : "Live in Luxury"}</div>
              <div className="footer__content__logo">
                {lang === "ar" ? " عش  " : "Live"}{" "}
                {lang === "ar" ? (
                  <img
                    loading="lazy"
                    className="footer__content__logo__img"
                    src="/assets/zodarb.webp"
                    alt="logo"
                  />
                ) : (
                  <img
                    loading="lazy"
                    className="footer__content__logo__img"
                    src="/assets/footerlogo.webp"
                    alt="logo"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="footer__entry__container">
            <div className="footer__entry__container__upper">
              <Link
                href="/info"
                className="footer__entry__container__entry__text"
              >
                Info
              </Link>
              <Link
                href="/map"
                className="footer__entry__container__entry__text"
              >
                Map
              </Link>
            </div>
            <div className="footer__entry__bottom">
              <div className="footer__entry__container__entry__text">
                Google Play Application
              </div>
              <div className="footer__entry__container__entry__text">
                App Store Application
              </div>
            </div>
          </div>
          <div className="footer__content__hr">
            <div className="footer__content__hr__line" />
          </div>
          <div className="footer__content__bottom">
            <div className="footer__content__bottom__logo">
              <Image
                src="/assets/footerlogo2.webp"
                height={70}
                width={140}
                quality={100}
                alt="logo"
              />
              <Image
                src="/assets/footerlogo1.webp"
                height={70}
                width={140}
                quality={100}
                alt="logo"
              />
            </div>
            <div className="footer__content__bottom__social">
              <a
                href="https://x.com/zoodrealty"
                target="_blank"
                className="footer__content__bottom__social__icon"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.48938 6.775L15.3176 0H13.9364L8.87588 5.8825L4.83388 0H0.171875L6.28412 8.8955L0.171875 16H1.55312L6.89738 9.78788L11.1659 16H15.8279L9.489 6.775H9.48938ZM7.59763 8.97375L6.97825 8.088L2.05075 1.03975H4.17225L8.14863 6.728L8.76787 7.61375L13.937 15.0075H11.8158L7.59763 8.97412V8.97375Z"
                    fill="currentcolor"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zoodrealty"
                target="_blank"
                className="footer__content__bottom__social__icon"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4355 0.833984C14.6975 0.833984 16.5312 2.66771 16.5312 4.92973V13.2382C16.5312 15.5003 14.6975 17.334 12.4355 17.334H4.12699C1.86498 17.334 0.03125 15.5003 0.03125 13.2382V4.92973C0.03125 2.66771 1.86498 0.833984 4.12699 0.833984H12.4355ZM8.33976 3.87654C5.43145 3.87654 3.0738 6.23419 3.0738 9.1425C3.0738 12.0508 5.43145 14.4085 8.33976 14.4085C11.2481 14.4085 13.6057 12.0508 13.6057 9.1425C13.6057 6.23419 11.2481 3.87654 8.33976 3.87654ZM8.33976 6.21696C9.95549 6.21696 11.2653 7.52677 11.2653 9.1425C11.2653 10.7582 9.95549 12.068 8.33976 12.068C6.72403 12.068 5.41423 10.7582 5.41423 9.1425C5.41423 7.52677 6.72403 6.21696 8.33976 6.21696ZM13.6642 2.88186C13.2118 2.88186 12.8451 3.2486 12.8451 3.70101C12.8451 4.15341 13.2118 4.52015 13.6642 4.52015C14.1166 4.52015 14.4834 4.15341 14.4834 3.70101C14.4834 3.2486 14.1166 2.88186 13.6642 2.88186Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/zood-realestate/"
                target="_blank"
                className="footer__content__bottom__social__icon"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9062 10.9441V17.3087H14.209V11.3703C14.209 9.87858 13.6743 8.86051 12.336 8.86051C11.3144 8.86051 10.7064 9.54661 10.439 10.2103C10.3414 10.4476 10.3163 10.7778 10.3163 11.1099V17.3087H6.61783C6.61783 17.3087 6.66764 7.25106 6.61783 6.20901H10.3159V7.78235C10.3084 7.79412 10.2987 7.80681 10.2916 7.81822H10.3159V7.78235C10.8073 7.02712 11.6847 5.94825 13.6488 5.94825C16.0821 5.94825 17.9062 7.53468 17.9062 10.9441ZM2.74907 0.858398C1.48382 0.858398 0.65625 1.68663 0.65625 2.77579C0.65625 3.84122 1.45988 4.69459 2.69998 4.69459H2.72468C4.01443 4.69459 4.81654 3.84138 4.81654 2.77579C4.79224 1.68663 4.01443 0.858398 2.74907 0.858398ZM0.875907 17.3087H4.57298V6.20901H0.875907V17.3087Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ZOOD_realestate"
                target="_blank"
                className="footer__content__bottom__social__icon"
              >
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.244 0C10.778 0.003 12.114 0.016 13.534 0.073L14.038 0.0949998C15.467 0.162 16.895 0.278 17.604 0.475C18.549 0.741 19.291 1.515 19.542 2.497C19.942 4.057 19.992 7.099 19.998 7.836L19.999 7.988V8.162C19.992 8.899 19.942 11.942 19.542 13.501C19.288 14.486 18.545 15.261 17.604 15.523C16.895 15.72 15.467 15.836 14.038 15.903L13.534 15.926C12.114 15.982 10.778 15.996 10.244 15.998L10.009 15.999H9.754C8.624 15.992 3.898 15.941 2.394 15.523C1.45 15.257 0.707 14.483 0.456 13.501C0.0560001 11.941 0.006 8.899 0 8.162V7.836C0.006 7.099 0.0560001 4.056 0.456 2.497C0.71 1.512 1.453 0.737 2.395 0.476C3.898 0.0569998 8.625 0.006 9.755 0H10.244ZM7.999 4.5V11.5L13.999 8L7.999 4.5Z"
                    fill="currentcolor"
                  />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/add/zoodrealty"
                target="_blank"
                className="footer__content__bottom__social__icon"
              >
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.87076 18.765C8.68076 18.765 7.88676 18.203 7.17776 17.708C6.67376 17.351 6.20176 17.012 5.64476 16.918C5.37954 16.8726 5.11084 16.8505 4.84176 16.852C4.36976 16.852 3.99476 16.923 3.72776 16.977C3.55776 17.007 3.41576 17.035 3.30376 17.035C3.18776 17.035 3.04076 17.003 2.98376 16.807C2.93376 16.647 2.90276 16.495 2.87176 16.348C2.79176 15.978 2.72476 15.751 2.58576 15.728C1.09676 15.501 0.205758 15.158 0.0317582 14.752C0.0177582 14.708 0.00075833 14.662 0.00075833 14.627C-0.00924167 14.503 0.0807583 14.4 0.205758 14.377C1.38676 14.182 2.44776 13.553 3.34376 12.519C4.03976 11.716 4.37876 10.94 4.40976 10.856C4.40976 10.846 4.41876 10.846 4.41876 10.846C4.58943 10.4947 4.62342 10.1963 4.52076 9.951C4.32876 9.491 3.69576 9.295 3.26376 9.161C3.15276 9.131 3.05876 9.095 2.97876 9.068C2.60876 8.921 1.99276 8.608 2.07376 8.176C2.13176 7.864 2.54576 7.641 2.88476 7.641C2.97876 7.63967 3.05876 7.65633 3.12476 7.691C3.50476 7.864 3.84776 7.953 4.14176 7.953C4.50776 7.953 4.68176 7.815 4.72576 7.771C4.71644 7.5732 4.70477 7.37552 4.69076 7.178C4.60076 5.813 4.49876 4.119 4.93076 3.148C6.22876 0.241 8.98376 0.0079999 9.79976 0.0079999L10.1558 0H10.2058C11.0208 0 13.7758 0.227 15.0738 3.139C15.5108 4.11 15.4038 5.809 15.3138 7.169L15.3048 7.236C15.2968 7.418 15.2828 7.592 15.2748 7.771C15.3188 7.806 15.4788 7.94 15.8088 7.944C16.0948 7.936 16.4068 7.842 16.7628 7.681C16.8613 7.63828 16.9674 7.61584 17.0748 7.615C17.1998 7.615 17.3248 7.645 17.4318 7.681H17.4408C17.7398 7.793 17.9358 8.002 17.9358 8.221C17.9448 8.426 17.7838 8.738 17.0218 9.046C16.9418 9.076 16.8478 9.113 16.7368 9.139C16.3128 9.269 15.6798 9.474 15.4788 9.929C15.3678 10.169 15.4118 10.477 15.5818 10.825C15.5818 10.833 15.5908 10.833 15.5908 10.833C15.6398 10.958 16.9278 13.883 19.7948 14.36C19.8534 14.3699 19.9064 14.4006 19.9441 14.4466C19.9818 14.4926 20.0016 14.5506 19.9998 14.61C20.0004 14.6547 19.9901 14.6977 19.9688 14.739C19.7948 15.149 18.9118 15.483 17.4138 15.715C17.2758 15.737 17.2088 15.965 17.1288 16.335C17.0969 16.4892 17.0599 16.6423 17.0178 16.794C16.9728 16.941 16.8788 17.021 16.7178 17.021H16.6968C16.5542 17.0184 16.4122 17.002 16.2728 16.972C15.9062 16.894 15.5325 16.8551 15.1578 16.856C14.8891 16.8567 14.6209 16.8792 14.3558 16.923C13.8028 17.013 13.3258 17.356 12.8218 17.713C12.1038 18.203 11.3058 18.765 10.1248 18.765H9.87076Z"
                    fill="currentcolor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Footer;
