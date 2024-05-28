import { subMonths, subYears, eachDayOfInterval, startOfWeek } from "date-fns";
import { Range } from "../ui/Dashboard/Analytics/RangeNav";

export const getDateRange = (range: Range) => {
  const endDate = new Date();
  let startDate;

  switch (range) {
    case "week":
      startDate = startOfWeek(endDate);
      break;
    case "month":
      startDate = subMonths(endDate, 1);
      break;
    case "sixMonths":
      startDate = subMonths(endDate, 6);
      break;
    case "year":
      startDate = subYears(endDate, 1);
      break;
    default:
      throw new Error("Invalid range specified");
  }

  return eachDayOfInterval({ start: startDate, end: endDate }).map(
    (date) => date
  );
};
