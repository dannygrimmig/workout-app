"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { getDateRange } from "./utils";

async function fetchWorkoutCountOnDate(date: Date, userId: number) {
  try {
    const response = await sql`
        SELECT COUNT(*) AS workout_count
        FROM workouts
        WHERE
            user_id = ${userId} AND
            date = ${date.toDateString()}
        `;
    return Number(response.rows[0].workout_count);
  } catch (error) {
    return 0;
  }
}

async function fetchWorkoutCountOnDates(dates: Date[], userId: number) {
  const promises = dates.map(async (date) => {
    try {
      const count = await fetchWorkoutCountOnDate(date, userId);
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

export async function fetchAnnualWorkoutCount(userId: number) {
  unstable_noStore();
  const dates = getDateRange("year");
  try {
    const data = await fetchWorkoutCountOnDates(dates, userId);
    return data;
  } catch (error) {
    return [];
  }
}
