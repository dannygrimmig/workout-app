"use client";
import * as React from "react";

import { LineChart } from "@mui/x-charts";
import { Range } from "../Analytics/RangeNav";
import { fetchAnnualWorkoutCount } from "@/app/lib/analyitics";
import { getDateRange } from "@/app/lib/utils";
import "./styles.css";

export type DateCount = { date: Date; count: number };

export function Line(props: { range: Range }) {
  // imported
  const { range } = props;

  // managed
  const [yearData, setYearData] = React.useState<DateCount[]>([]);
  const [workoutData, setWorkoutData] = React.useState<DateCount[]>([]);

  // 1 DB Call: Full Year
  React.useEffect(() => {
    async function fetchYearData() {
      const response = await fetchAnnualWorkoutCount();
      setYearData(response);
    }
    fetchYearData();
  }, []);

  // Filter Year Data
  React.useEffect(() => {
    const dateRange = getDateRange(range);
    const filtered = yearData.filter(
      ({ date }) =>
        date >= dateRange[0] && date <= dateRange[dateRange.length - 1]
    );

    // Progress Sum
    let sum = 0;
    const toReturn = filtered.map((current) => {
      sum += current.count;
      return {
        ...current,
        count: sum,
      };
    });

    setWorkoutData(toReturn);
  }, [range, yearData]);

  return (
    <LineChart
      dataset={workoutData}
      xAxis={[{ dataKey: "date", scaleType: "utc" }]}
      series={[
        {
          dataKey: "count",
          showMark: false,
        },
      ]}
      loading={workoutData.length <= 0}
    />
  );
}
