"use client";

import useLanguage from "@/hooks/useLanguage";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "Jan", properties: 0 },
  { name: "Feb", properties: 0 },
  { name: "Mar", properties: 0 },
  { name: "Apr", properties: 6 },
  { name: "May", properties: 0 },
  { name: "Jun", properties: 0 },
  { name: "Jul", properties: 0 },
  { name: "Aug", properties: 8 },
  { name: "Sep", properties: 6 },
  { name: "Oct", properties: 7 },
  { name: "Nov", properties: 2 },
  { name: "Dec", properties: 4 }
];

const translations = {
  en: {
    properties: "Properties"
  },
  ar: {
    properties: "الملكيات"
  }
} as const;

export default function CustomerPropertiesBought() {
  const [lang] = useLanguage();
  return (
    <ResponsiveContainer width="100%" height={225}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD57E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFD57E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--whiteShadow)",
            borderRadius: 10,
            border: "none",
            boxShadow: "var(--boxShadow)"
          }}
          formatter={(value, name: keyof (typeof translations)["en"]) => {
            const translatedName =
              translations[lang as "en" | "ar"][
                name as keyof (typeof translations)["en"]
              ];
            return [value, translatedName];
          }}
        />

        <Area
          type="monotone"
          dataKey="properties"
          stroke="#FFAB00"
          fill="url(#colorProperties)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
