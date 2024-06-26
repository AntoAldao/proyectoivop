// import "./styles.css";
import React from "react";
import { SeparetedSales } from "@/pages/api/venta/demandaHistorica/[id]";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// export interface DataLinealChart {
//     period: string;
//     realValue: number;
//     predictionValue: number;
// } 
// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];


export default function LinealChart({ historial }: { historial: SeparetedSales[] }) {

    // console.log(historial);
    const data = historial?.map((item) => {
        return {
            name: item.periodStart?.toString().split("T")[0],
            value: item.quantity
        }
    });

  return (
    <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />

    </LineChart>
  );
}