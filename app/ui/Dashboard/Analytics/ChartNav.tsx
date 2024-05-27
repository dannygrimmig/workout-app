"use client";
import * as React from "react";

export type Chart = "workouts" | "category" | "progress";
const chartOptions: { title: string; chart: Chart }[] = [
  { title: "progress", chart: "progress" },
  { title: "category", chart: "category" },
  { title: "workouts", chart: "workouts" },
];

export function ChartNav(props: {
  activeTab: Chart;
  onTabChange: (tab: Chart) => void;
}) {
  const { activeTab, onTabChange } = props;

  return (
    <div className="flex gap-4">
      {chartOptions.map((option) => (
        <TabButton
          key={option.chart}
          title={option.title}
          isActive={activeTab === option.chart}
          onClick={() => onTabChange(option.chart)}
        />
      ))}
    </div>
  );
}

function TabButton(props: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const { title, isActive, onClick } = props;
  return (
    <button
      className={`${isActive && "underline decoration-1 underline-offset-2"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
