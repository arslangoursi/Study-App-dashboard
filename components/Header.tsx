"use client";

import "@/styles/header.scss";

import { useLayoutEffect, useState } from "react";

import Close from "@/icons/Close";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/icons/Menu";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [language, setLanguage] = useLanguage();
  const [menuOpen, setMenuOpen] = useState(true);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const checkNavOpenClose = () => {
      if (window.innerWidth < 768) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };

    checkNavOpenClose();
    window.addEventListener("resize", checkNavOpenClose);
    return () => window.removeEventListener("resize", checkNavOpenClose);
  }, []);

  const showWhiteHeader =
    pathname === "/" || pathname === "/opal" || pathname.includes("/projects/");

  return (
    pathname !== "/opal" &&
    pathname !== "/scan" && (
      <div className="header__main">
        <div className={showWhiteHeader ? "header" : "header__other"}>
          <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
            <Link
              className={
                showWhiteHeader
                  ? "header__nav__item"
                  : "header__nav__item__other"
              }
              href="/info"
            >
              {language === "ar" ? "معلومات" : "Info"}
            </Link>
            <Link
              href="/contactUs"
              className={
                showWhiteHeader
                  ? "header__nav__item"
                  : "header__nav__item__other"
              }
            >
              {language === "ar" ? "اتصال" : "Contact"}
            </Link>
            <Link
              href="/map"
              className={
                showWhiteHeader
                  ? "header__nav__item"
                  : "header__nav__item__other"
              }
            >
              {language === "ar" ? " الخريطة" : " Map"}
            </Link>
            <button
              onClick={() =>
                (window.location.href = showWhiteHeader ? "/login" : "/login")
              }
              className="header__login__button header__login__button__mobile"
            >
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </button>
          </nav>
          <Link
            href="/"
            className={showWhiteHeader ? "header__logo" : "header__logo__other"}
          >
            {showWhiteHeader ? (
              <Image
                src="/assets/logowhite.webp"
                alt="logo"
                width={140}
                height={32}
              />
            ) : (
              <Image
                src="/assets/logoblack.webp"
                alt="logo"
                width={140}
                height={32}
              />
            )}
          </Link>
          <div className="header__actions">
            <button
              type="button"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className={`${
                showWhiteHeader
                  ? "header__language"
                  : "header__language header__language__other"
              } ${language === "ar" ? "active" : ""}`}
            >
              <div className={`header__language__entry`}>EN</div>
              <div className={`header__language__entry`}>ع</div>
            </button>
            <button
              onClick={() =>
                (window.location.href = showWhiteHeader ? "/login" : "/login")
              }
              className="header__login__button header__login__button__desktop"
            >
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="header__actions__menu"
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
