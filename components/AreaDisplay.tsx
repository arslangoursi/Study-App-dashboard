"use client";

import useLanguage from "@/hooks/useLanguage";

export default function AreaDisplay({
  children
}: {
  children: number | string;
}) {
  const [lang] = useLanguage();

  const amount = typeof children === "number" ? children : parseFloat(children);

  if (isNaN(amount)) {
    return null;
  }

  const formattedAmount = amount.toLocaleString(lang === "ar" ? "ar" : "en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <span
      style={{
        direction: lang === "ar" ? "rtl" : "ltr",
        display: "inline-flex",
        flexDirection: lang === "ar" ? "row-reverse" : "row"
      }}
    >
      {lang === "ar" ? `م² ${formattedAmount}` : `${formattedAmount} m²`}
    </span>
  );
}
