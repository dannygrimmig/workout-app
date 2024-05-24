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
      chart = <Pie range={selectedRange} />;
      break;
    case "growth":
    default:
      chart = (
        <div>
          line / bar chart: will display overall growth / total of sets /
          workouts completed to date
        </div>
      );
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
