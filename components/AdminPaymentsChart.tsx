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

const data = [
  {
    name: "Jan",
    uv: 52,
    pv: 96
  },
  {
    name: "Feb",
    uv: 66,
    pv: 56
  },
  {
    name: "Mar",
    uv: 44,
    pv: 39
  },
  {
    name: "Apr",
    uv: 6,
    pv: 28
  },
  {
    name: "May",
    uv: 88,
    pv: 22
  },
  {
    name: "Jun",
    uv: 240,
    pv: 176
  },
  {
    name: "Jul",
    uv: 200,
    pv: 136
  },
  {
    name: "Aug",
    uv: 160,
    pv: 88
  },
  {
    name: "Sep",
    uv: 60,
    pv: 72
  },
  {
    name: "Oct",
    uv: 80,
    pv: 60
  },
  {
    name: "Nov",
    uv: 2,
    pv: 40
  },
  {
    name: "Dec",
    uv: 48,
    pv: 20
  }
];

export default function AdminPaymentsChart() {
  return (
    <ResponsiveContainer width="100%" height={225}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD57E" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFD57E" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#66D0AF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#66D0AF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="3"
          stroke="#FFAB00"
          fill="url(#colorUv)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#00A76F"
          fill="url(#colorPv)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
