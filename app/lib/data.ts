import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { User, Workout, Workout_Exercise } from "./definitions";

export async function fetchUsers() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  unstable_noStore();

  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchUserWorkouts(userId: number) {
  unstable_noStore();

  try {
    const data = await sql<Workout>`
      SELECT * 
      FROM workouts 
      WHERE 
        user_id = ${userId}
      `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchWorkoutExercises(workoutId: number) {
  unstable_noStore();

  try {
    const data = await sql<Workout_Exercise>`
        SELECT * 
        FROM workout_exercises 
        WHERE 
            workout_id = ${workoutId}
        `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
