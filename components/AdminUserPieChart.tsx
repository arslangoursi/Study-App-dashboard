import {
  Cell,
  Label,
  LabelProps,
  Pie,
  PieChart,
  ResponsiveContainer
} from "recharts";
import { FC, useEffect, useState } from "react";

interface DataEntry {
  name: string;
  value: number;
}

const data: DataEntry[] = [
  { name: "Users", value: 400 },
  { name: "Customers", value: 100 }
];
const COLORS = ["#0088FE", "#00C49F", "#FF8042"];
const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

const AdminUserPieChart: FC = () => {
  const [hoveredValue, setHoveredValue] = useState<string>(
    `Total: ${totalValue}`
  );
  const [hoveredName, setHoveredName] = useState<string>("Total");

  const onPieEnter = (_: any, index: number) => {
    setHoveredName(data[index].name);
    setHoveredValue(data[index].value.toString());
  };

  const onPieLeave = () => {
    setHoveredName("Total");
    setHoveredValue(totalValue.toString());
  };

  interface CustomViewBox {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }

  const renderCustomLabel = (
    props: LabelProps & { viewBox?: CustomViewBox }
  ) => {
    const { viewBox } = props;
    const { x = 0, y = 0, width = 0, height = 0 } = viewBox || {};
    const cx = x + width / 2;
    const cy = y + height / 2;

    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
        <tspan x={cx} dy="-0.5em" fontSize="12px" fill="gray">
          {hoveredName}
        </tspan>
        <tspan x={cx} dy="1.2em" fontSize="24px" fill="var(--blue)">
          {hoveredValue}
        </tspan>
      </text>
    );
  };

  useEffect(() => {
    setHoveredName("Total");
    setHoveredValue(totalValue.toString());
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%" minHeight={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="70%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label content={renderCustomLabel} position="center" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data.map((entry, index) => (
          <div
            key={entry.name}
            style={{ display: "flex", alignItems: "center", margin: "0 8px" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "8px"
              }}
            />
            <span style={{ fontSize: "14px" }}>{entry.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminUserPieChart;
