"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import useLanguage from "@/hooks/useLanguage";

const data = [
  { name: "Jan", sold: 0, inProcess: 0 },
  { name: "Feb", sold: 0, inProcess: 0 },
  { name: "Mar", sold: 0, inProcess: 0 },
  { name: "Apr", sold: 6, inProcess: 4 },
  { name: "May", sold: 0, inProcess: 2 },
  { name: "Jun", sold: 0, inProcess: 3 },
  { name: "Jul", sold: 0, inProcess: 1 },
  { name: "Aug", sold: 8, inProcess: 5 },
  { name: "Sep", sold: 6, inProcess: 4 },
  { name: "Oct", sold: 7, inProcess: 6 },
  { name: "Nov", sold: 2, inProcess: 3 },
  { name: "Dec", sold: 4, inProcess: 5 }
];

const translations = {
  en: {
    sold: "Sold",
    inProcess: "In Process"
  },
  ar: {
    sold: "مُباع",
    inProcess: "قيد التنفيذ"
  }
} as const;

export default function CustomerSaleAnalyticsChart() {
  const [lang] = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={225}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD57E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFD57E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorInProcess" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="sold"
          stackId="1"
          stroke="#FFAB00"
          fill="url(#colorSold)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="inProcess"
          stackId="2"
          stroke="#00A76F"
          fill="url(#colorInProcess)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
