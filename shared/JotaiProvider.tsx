"use client";

import { jotaiStore, languageAtom } from "@/constants/state";

import { Provider } from "jotai";
import { ReactNode } from "react";

interface IJotaiProvider {
  children: ReactNode;
  language: "ar" | "en";
}

export default function JotaiProvider({ children, language }: IJotaiProvider) {
  jotaiStore.set(languageAtom, language);
  return <Provider store={jotaiStore}>{children}</Provider>;
}
