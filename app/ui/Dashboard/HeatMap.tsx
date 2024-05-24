"use client";
import * as React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, subMonths, subYears } from "date-fns";
import { generateRandomWorkoutData } from "@/app/lib/testdata";
import "./styles.css";
type Range = "month" | "sixMonths" | "year";

export function HeatMap() {
  const [selectedRange, setSelectedRange] = React.useState<Range>("year");
  const [endDate, setEndDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(subDays(endDate, 365));

  React.useEffect(() => {
    fetchData(selectedRange);
  }, [selectedRange]);

  const fetchData = (range: Range) => {
    let newStart, newEnd;
    switch (range) {
      case "month":
        newStart = subMonths(new Date(), 1);
        newEnd = new Date();
        break;
      case "sixMonths":
        newStart = subMonths(new Date(), 6);
        newEnd = new Date();
        break;
      case "year":
      default:
        newStart = subYears(new Date(), 1);
        newEnd = new Date();
        break;
    }

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const workoutData = generateRandomWorkoutData();
  console.log(workoutData);
  return (
    <div className="heatmap-container">
      <Nav
        activeTab={selectedRange}
        onTabChange={(range) => setSelectedRange(range)}
      />

      <CalendarHeatmap
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
      />
    </div>
  );
}
type NavProps = {
  activeTab: Range;
  onTabChange: (tab: Range) => void;
};
function Nav(props: NavProps) {
  const { activeTab, onTabChange } = props;

  return (
    <div className="flex gap-4">
      <button
        className={`${
          activeTab === "month" && "underline decoration-1 underline-offset-2"
        }`}
        onClick={() => onTabChange("month")}
      >
        1 Month
      </button>
      <button
        className={`${
          activeTab === "sixMonths" &&
          "underline decoration-1 underline-offset-2"
        }`}
        onClick={() => onTabChange("sixMonths")}
      >
        6 Months
      </button>
      <button
        className={`${
          activeTab === "year" && "underline decoration-1 underline-offset-2"
        }`}
        onClick={() => onTabChange("year")}
      >
        1 Year
      </button>
    </div>
  );
}
