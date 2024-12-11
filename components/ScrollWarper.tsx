"use client";

import { ReactNode } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

export default function ScrollWarper({ children }: { children: ReactNode }) {
  return (
    <ScrollContainer vertical={false} className="listing__page__analytics">
      {children}
    </ScrollContainer>
  );
}
