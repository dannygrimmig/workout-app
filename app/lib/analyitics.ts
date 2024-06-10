"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { Range } from "../ui/Dashboard/Analytics/RangeNav";
import { getDateRange } from "./utils";

async function fetchWorkoutCountOnDate(date: Date) {
  try {
    const response = await sql`
        SELECT COUNT(*) AS workout_count
        FROM workouts
        WHERE
            user_id = 28 AND
            date = ${date}
        `;
    return Number(response.rows[0].workout_count);
  } catch (error) {
    return 0;
  }
}

async function fetchWorkoutCountOnDates(dates: Date[]) {
  const promises = dates.map(async (date) => {
    try {
      const count = await fetchWorkoutCountOnDate(date);
      return {
        date: date,
        count: count,
      };
    } catch (error) {
      return {
        date: date,
        count: 0,
      };
    }
  });

  const data = await Promise.all(promises);
  return data;
}

export async function fetchWorkoutProgress(range: Range) {
  unstable_noStore();

  const dates = getDateRange(range);

  try {
    const data = await fetchWorkoutCountOnDates(dates);
    let sum = 0;
    const toReturn = data.map((current) => {
      sum += current.count;
      return {
        ...current,
        count: sum,
      };
    });

    return toReturn;
  } catch (error) {
    return [];
  }
}
