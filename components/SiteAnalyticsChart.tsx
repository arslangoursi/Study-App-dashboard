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

const translations = {
  en: {
    clicks: "Clicks",
    visits: "Visits"
  },
  ar: {
    clicks: "النقرات",
    visits: "الزيارات"
  }
} as const;

export default function SiteAnalyticsChart({ chartData }: { chartData: any }) {
  const [lang] = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={225}>
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#FFD57E" stopOpacity={0} />
            <stop offset="95%" stopColor="#FFD57E" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#66D0AF" stopOpacity={0} />
            <stop offset="95%" stopColor="#66D0AF" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--chartAxisLines)" strokeDasharray="1 1" />
        <XAxis dataKey="date" />
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
          dataKey="clicks"
          stackId="3"
          stroke="#FFAB00"
          fill="url(#colorUv)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="visits"
          stackId="1"
          stroke="#00A76F"
          fill="url(#colorPv)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
