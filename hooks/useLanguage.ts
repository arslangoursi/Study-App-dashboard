"use client";

import { useCallback, useEffect } from "react";

import getCookieClient from "@/utils/getCookieClient";
import { languageAtom } from "@/constants/state";
import localFont from "next/font/local";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

const beausiteFit = localFont({ src: "../app/fonts/BeausiteFit.otf" });

const shaheenProArabic = localFont({
  src: "../app/fonts/shaheenproArabic-Light-cypwbi.otf"
});

const fonts = {
  ar: shaheenProArabic.className,
  en: beausiteFit.className
};

export default function useLanguage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useAtom(languageAtom);

  const setLanguage = useCallback(
    (lang: "ar" | "en") => {
      if (lang === currentLanguage) return;

      document.documentElement.lang = lang;
      document.body.className = fonts[lang];
      document.cookie = `lang=${lang}; path=/`;

      setCurrentLanguage(lang);
      router.refresh();
    },
    [currentLanguage, router, setCurrentLanguage]
  );

  useEffect(() => {
    const savedLanguage = getCookieClient("lang") as "ar" | "en";

    if (savedLanguage && savedLanguage !== currentLanguage) {
      setLanguage(savedLanguage);
    }
  }, [currentLanguage, setLanguage]);

  return [currentLanguage, setLanguage] as const;
}
