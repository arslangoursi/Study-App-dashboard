"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  {
    name: "2018",
    uv: 52,
    pv: 96
  },
  {
    name: "2019",
    uv: 66,
    pv: 56
  },
  {
    name: "2020",
    uv: 44,
    pv: 39
  },
  {
    name: "2021",
    uv: 6,
    pv: 28
  },
  {
    name: "2022",
    uv: 88,
    pv: 22
  },
  {
    name: "2023",
    uv: 240,
    pv: 176
  }
];

export default function PropertySaleChart() {
  return (
    <ResponsiveContainer width="100%" height={225}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#FFAB00"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="uv" stroke="#00A76F" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
