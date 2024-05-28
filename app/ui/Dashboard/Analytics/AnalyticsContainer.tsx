"use client";
import * as React from "react";

import { Range, RangeNav } from "./RangeNav";
import { HeatMap } from "../HeatMap/HeatMap";
import { Chart, ChartNav } from "./ChartNav";
import { Pie } from "../PieChart/PieChart";
import { Line } from "../Line/Line";

export function AnalyticsContainer() {
  const [selectedRange, setSelectedRange] = React.useState<Range>("week");
  const [selectedChart, setSelectedChart] = React.useState<Chart>("progress");

  let chart;
  switch (selectedChart) {
    case "workouts":
      chart = <HeatMap range={selectedRange} />;
      break;
    case "category":
      chart = <Pie range={selectedRange} />;
      break;
    case "progress":
    default:
      chart = <Line range={selectedRange} />;
      break;
  }

  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <ChartNav
        activeTab={selectedChart}
        onTabChange={(chart) => setSelectedChart(chart)}
      />

      <div className="flex-1">{chart}</div>

      <RangeNav
        activeTab={selectedRange}
        onTabChange={(range) => setSelectedRange(range)}
      />
    </div>
  );
}
