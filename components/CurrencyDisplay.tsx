"use client";

import useLanguage from "@/hooks/useLanguage";

export default function CurrencyDisplay({
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  return `${formattedAmount} ${lang === "ar" ? "ريال" : "SAR"}`;
}
