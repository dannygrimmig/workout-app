"use client";
import * as React from "react";
import { Range } from "../Analytics/RangeNav";

type HeatMapProps = {
  range: Range;
};

export function HeatMap(props: HeatMapProps) {
  // imported
  const { range } = props;

  return (
    <div className="heatmap-container">
      <p>🚧 work in progress</p>
    </div>
  );
}
