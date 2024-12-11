"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import useHideScrollBar from "@/hooks/useHideScrollBar";

export default function PropertyCardPdfViewer({
  data,
  Pdf
}: {
  data: any;
  Pdf: React.ComponentType<{
    data: any;
  }>;
}) {
  useHideScrollBar();

  return (
    <PDFViewer style={{ width: "100%", height: "100vh", border: "none" }}>
      <Pdf data={data} />
    </PDFViewer>
  );
}
