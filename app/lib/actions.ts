"use server";

import { createClient } from "@vercel/postgres";
import { Set, Workout, Workout_Exercise } from "./definitions";

export async function createWorkout(
  workout: Workout,
  workoutExercises: Workout_Exercise[],
  sets: Set[]
) {
  const client = createClient();
  await client.connect();

  try {
    // Insert WORKOUT -> retrieve workout_id
    const workoutQuery = `
      INSERT INTO workouts (date, time, notes, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const workoutValues = [
      workout.date,
      workout.time,
      workout.notes,
      workout.user_id,
    ];
    const workoutResult = await client.query(workoutQuery, workoutValues);
    const workoutId = workoutResult.rows[0].id;

    // Insert WORKOUT_EXERCISES (using workout_id)
    for (const exerciseData of workoutExercises) {
      const exerciseQuery = `
          INSERT INTO workout_exercises (workout_id, exercise_id)
          VALUES ($1, $2)
          RETURNING id;
        `;
      const exerciseValues = [workoutId, exerciseData.exercise_id];
      const exerciseResult = await client.query(exerciseQuery, exerciseValues);
      const exerciseId = exerciseResult.rows[0].id;

      //   Insert SETS (from this current exercise)
      const currentSets = sets.filter(
        (set: Set) => set.workout_exercise_id === exerciseData.id
      );

      for (const set of currentSets) {
        const setQuery = `
          INSERT INTO sets (workout_exercise_id, reps, weight, order_index)
          VALUES ($1, $2, $3, $4)
        `;
        const setValues = [exerciseId, set.reps, set.weight, set.order_index];
        await client.query(setQuery, setValues);
      }
    }

    await client.query("COMMIT"); // Commit the transaction
    console.log("Workout and exercises inserted successfully!");
    return workoutId; // Return the workout ID
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Workout.",
    };
  } finally {
    await client.end();
  }
}
