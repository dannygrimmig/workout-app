"use client";
import * as React from "react";

import CalendarHeatmap from "react-calendar-heatmap";
import { startOfWeek, subMonths, subYears } from "date-fns";
import { Range } from "../Analytics/RangeNav";

// sample data
import { generateRandomWorkoutData } from "@/app/lib/testdata";

// styles
import "react-calendar-heatmap/dist/styles.css";
import "./styles.css";

type HeatMapProps = {
  range: Range;
};

export function HeatMap(props: HeatMapProps) {
  // imported
  const { range } = props;

  // managed
  const [startDate, setStartDate] = React.useState(startOfWeek(new Date()));

  // derived
  const endDate = new Date();
  const workoutData = generateRandomWorkoutData();

  React.useEffect(() => {
    fetchData(range);
  }, [range]);

  const fetchData = (range: Range) => {
    let newStart;
    switch (range) {
      case "week":
        newStart = startOfWeek(new Date());
        break;
      case "month":
        newStart = subMonths(new Date(), 1);
        break;
      case "sixMonths":
        newStart = subMonths(new Date(), 6);
        break;
      case "year":
      default:
        newStart = subYears(new Date(), 1);
        break;
    }
    setStartDate(newStart);
  };

  return (
    <div className="heatmap-container">
      <p>🚧 work in progress</p>
      {/* <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={workoutData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${Math.min(value.count, 4)}`;
        }}
        showWeekdayLabels
        horizontal={range !== "week"}
      /> */}
    </div>
  );
}
