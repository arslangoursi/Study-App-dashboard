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
  { name: "Jan", bought: 0, sold: 0 },
  { name: "Feb", bought: 0, sold: 0 },
  { name: "Mar", bought: 0, sold: 0 },
  { name: "Apr", bought: 6, sold: 4 },
  { name: "May", bought: 0, sold: 2 },
  { name: "Jun", bought: 0, sold: 3 },
  { name: "Jul", bought: 0, sold: 1 },
  { name: "Aug", bought: 8, sold: 5 },
  { name: "Sep", bought: 6, sold: 4 },
  { name: "Oct", bought: 7, sold: 6 },
  { name: "Nov", bought: 2, sold: 3 },
  { name: "Dec", bought: 4, sold: 5 }
];

const translations = {
  en: {
    bought: "Bought",
    sold: "Sold"
  },
  ar: {
    bought: "مُشترى",
    sold: "مُباع"
  }
} as const;

export default function CustomerPropertiesChart() {
  const [lang] = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={225}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorBought" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD57E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFD57E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#66D0AF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#66D0AF" stopOpacity={0} />
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
          dataKey="bought"
          stackId="1"
          stroke="#FFAB00"
          fill="url(#colorBought)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="sold"
          stackId="2"
          stroke="#00A76F"
          fill="url(#colorSold)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
