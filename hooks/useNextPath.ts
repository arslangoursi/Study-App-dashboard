"use client";

import { nextPathAtom } from "@/constants/state";
import { useAtom } from "jotai";
import useLanguage from "./useLanguage";
import { useLayoutEffect } from "react";

export default function useNextPath({ ar, en }: { ar: string; en: string }) {
  const [lang] = useLanguage();
  const [, setNextPath] = useAtom(nextPathAtom);

  useLayoutEffect(() => {
    setNextPath(lang === "ar" ? ar : en);
    return () => setNextPath(null);
  }, [ar, en, lang, , setNextPath]);
}
