"use client";
import * as React from "react";

import { LineChart } from "@mui/x-charts";
import { Range } from "../Analytics/RangeNav";
const xAxis = [1, 2, 3, 5, 8, 10];

export function Line(props: { range: Range }) {
  const { range } = props;

  const dataMap: Record<Range, number[]> = {
    week: generateData(),
    month: generateData(),
    sixMonths: generateData(),
    year: generateData(),
  };

  return (
    <div>
      <p>🚧 random data right now 🚧</p>

      <LineChart
        xAxis={[{ data: xAxis }]}
        series={[
          {
            data: dataMap[range],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

const generateData = () => xAxis.map(() => Math.floor(Math.random() * 10));
