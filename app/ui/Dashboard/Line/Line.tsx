"use client";
import * as React from "react";

import { LineChart } from "@mui/x-charts";
import { Range } from "../Analytics/RangeNav";
import { getDateRange } from "@/app/lib/utils";

export function Line(props: { range: Range }) {
  // imported
  const { range } = props;

  // managed
  const [workoutData, setWorkoutData] = React.useState<
    { date: Date; count: number }[]
  >([]);

  React.useEffect(() => {
    fetchData(range);
  }, [range]);

  const fetchData = async (range: Range) => {
    const dates = getDateRange(range);

    // for api fetch
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    let prev = 0;
    const data = dates.map((date) => {
      const bool = Math.floor(Math.random() * 2);
      const count = bool === 0 ? prev : prev + Math.floor(Math.random() * 10);
      prev = count;

      return {
        date: date,
        count: count,
      };
    });

    setWorkoutData(data);
  };

  // derived
  const chartData = workoutData.map((item) => ({
    x: item.date,
    y: item.count,
  }));

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
    />
  );
}
