"use client";
import * as React from "react";

const Date_Options = ["1W", "1M", "6M", "1Y"] as const;
type Date_Type = (typeof Date_Options)[number];

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH = ["4/1", "4/8", "4/15", "4/22", "4/29"];
const YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateMap: Record<Date_Type, string[]> = {
  "1W": WEEK,
  "1M": MONTH,
  "6M": YEAR.slice(6),
  "1Y": YEAR,
};

export function HistoryGridItem() {
  const [currentDate, setCurrentDate] = React.useState<Date_Type>("1W");

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <NavToggle
        options={Date_Options}
        currentOption={currentDate}
        onOptionChange={(newOption) => setCurrentDate(newOption)}
      />
      <div className="flex-1flex items-end">
        <BarChart items={DateMap[currentDate]} />
      </div>
    </div>
  );
}

type BarChartProps = {
  items: string[];
};

function BarChart(props: BarChartProps) {
  // imported
  const { items } = props;

  // managed
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight - 6);
    }
  }, [ref]);

  return (
    <div ref={ref} className="grid grid-flow-col-dense gap-2 grow bg-orange">
      {items.map((item, i) => {
        const currHeight = Math.floor(Math.random() * height);
        return <BarChartItem key={item} title={item} height={currHeight} />;
      })}
    </div>
  );
}

type BarChartItemProps = {
  title: string;
  height: number;
  baseColor?: string;
  activeColor?: string;
};
function BarChartItem(props: BarChartItemProps) {
  const {
    title,
    height,
    baseColor = "bg-sky-400",
    activeColor = "bg-sky-200",
  } = props;

  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="flex flex-col justify-end gap-2">
      {isActive && <p>{height}</p>}
      <button
        type="button"
        className={`rounded-2xl ${isActive ? baseColor : activeColor}`}
        onMouseOver={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        style={{ height: `${height}rem` }}
      ></button>
      <h3>{title}</h3>
    </div>
  );
}

type NavToggleProps = {
  options: string[];
  currentOption?: string;
  onOptionChange: (newOption: string) => void;
};
function NavToggle(props: NavToggleProps) {
  const { options, currentOption, onOptionChange } = props;

  return (
    <ul className="flex gap-6">
      {options.map((option, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => onOptionChange(option)}
            className={`${
              option === currentOption &&
              "underline underline-offset-4 decoration-1"
            } `}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}
