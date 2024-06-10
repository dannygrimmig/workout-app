"use client";
import * as React from "react";

import { LineChart } from "@mui/x-charts";
import { Range } from "../Analytics/RangeNav";
import "./styles.css";
import { fetchWorkoutProgress } from "@/app/lib/analyitics";

export function Line(props: { range: Range }) {
  // imported
  const { range } = props;

  // managed
  const [workoutData, setWorkoutData] = React.useState<
    { date: Date; count: number }[]
  >([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetchWorkoutProgress(range);
      setWorkoutData(response);
    }
    fetchData();
  }, [range]);

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
