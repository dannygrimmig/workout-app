import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { Exercise, Set, User, Workout, Workout_Exercise } from "./definitions";
import { auth } from "@/auth";
import email from "next-auth/providers/email";

export async function getUser() {
  const session = await auth();
  const id = await fetchUserId(session?.user?.email ?? "");
  const user = {
    id: id || 0,
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    password: "",
  };

  return user;
}

export async function fetchUsers() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  unstable_noStore();

  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users");
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
    throw new Error("Failed to fetch user workouts");
  }
}

export async function fetchUserId(email: string) {
  unstable_noStore();

  try {
    const data = await sql<User>`
      SELECT id 
      FROM users 
      WHERE 
        email = ${email}
      `;

    return data.rows[0].id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user workouts");
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
    throw new Error("Failed to fetch workout exercises");
  }
}

export async function fetchSets(workoutExerciseId: number) {
  unstable_noStore();

  try {
    const data = await sql<Set>`
        SELECT * 
        FROM sets 
        WHERE 
            workout_exercise_id = ${workoutExerciseId}
        `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sets");
  }
}

export async function fetchExercises() {
  try {
    const data = await sql<Exercise>`SELECT * FROM exercises`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exercises");
  }
}
