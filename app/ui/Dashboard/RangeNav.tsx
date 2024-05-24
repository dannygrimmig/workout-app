"use client";
import * as React from "react";

export type Range = "week" | "month" | "sixMonths" | "year";
const rangeOptions: { title: string; range: Range }[] = [
  { title: "1W", range: "week" },
  { title: "1M", range: "month" },
  { title: "6M", range: "sixMonths" },
  { title: "1Y", range: "year" },
];

export function RangeNav(props: {
  activeTab: Range;
  onTabChange: (tab: Range) => void;
}) {
  const { activeTab, onTabChange } = props;

  return (
    <div className="flex gap-4">
      {rangeOptions.map((option) => (
        <TabButton
          key={option.range}
          title={option.title}
          isActive={activeTab === option.range}
          onClick={() => onTabChange(option.range)}
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
