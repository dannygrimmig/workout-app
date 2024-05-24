"use client";
import * as React from "react";

import { Range, RangeNav } from "./RangeNav";
import { HeatMap } from "../HeatMap/HeatMap";
import { Chart, ChartNav } from "./ChartNav";
import { Pie } from "../PieChart/PieChart";

export function AnalyticsContainer() {
  const [selectedRange, setSelectedRange] = React.useState<Range>("week");
  const [selectedChart, setSelectedChart] = React.useState<Chart>("workouts");

  let chart;
  switch (selectedChart) {
    case "workouts":
      chart = <HeatMap range={selectedRange} />;
      break;
    case "category":
    default:
      chart = <Pie range={selectedRange} />;
      break;
  }

  return (
    <div>
      <div className="flex justify-between">
        <RangeNav
          activeTab={selectedRange}
          onTabChange={(range) => setSelectedRange(range)}
        />
        <ChartNav
          activeTab={selectedChart}
          onTabChange={(chart) => setSelectedChart(chart)}
        />
      </div>

      {chart}
    </div>
  );
}
