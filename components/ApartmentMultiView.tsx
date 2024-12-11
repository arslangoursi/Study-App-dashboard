"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function ApartmentMultiView({
  modelView,
  stillView
}: {
  modelView: ReactNode;
  stillView: ReactNode;
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "still";

  return view === "model" ? modelView : stillView;
}
