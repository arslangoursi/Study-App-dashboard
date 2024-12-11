import { atom, createStore } from "jotai";

import { atomWithStorage } from "jotai/utils";

export const jotaiStore = createStore();

export const sidebarCollapsedAtom = atom(false);

export const languageAtom = atomWithStorage("language", "ar");

export const nextPathAtom = atom<string | null>(null);

export const cartStatusAtom = atom(false);

export const interestSelectedOptionsAtom = atom<string[]>([]);

export const cartAtom = atomWithStorage<
  {
    projectNumber: string;
    mapNumber: string;
    message: string;
    property: {
      id: string;
      entity: string;
      batch: string;
      area: string;
      unitPrice: number;
      images: string[];
    }[];
  }[]
>("cart", []);
