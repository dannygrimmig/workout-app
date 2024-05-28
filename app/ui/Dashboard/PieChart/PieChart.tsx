"use client";
import * as React from "react";

import { Range } from "../Analytics/RangeNav";
import { PieChart } from "@mui/x-charts";
import { bodypartArr } from "@/app/lib/definitions";

export function Pie(props: { range: Range }) {
  const { range } = props;

  const dataMap: Record<
    Range,
    {
      id: number;
      value: number;
      label: string;
    }[]
  > = {
    week: generateData(),
    month: generateData(),
    sixMonths: generateData(),
    year: generateData(),
  };

  return (
    <PieChart
      series={[
        {
          data: dataMap[range],
          innerRadius: 25,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
        },
      ]}
    />
  );
}

const generateData = () => {
  const data = bodypartArr.map((part, i) => {
    return {
      id: i,
      value: Math.floor(Math.random() * 10),
      label: part,
    };
  });
  return data;
};
