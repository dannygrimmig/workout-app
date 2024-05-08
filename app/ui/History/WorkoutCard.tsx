import { fetchWorkoutExercises } from "@/app/lib/data";
import { Workout, Workout_Exercise } from "@/app/lib/definitions";
import { formatDuration } from "@/app/lib/helpers";
import { WorkoutExercise } from "./WorkoutExercise";

export async function WorkoutCard(workout: Workout) {
  const exercises: Workout_Exercise[] = await fetchWorkoutExercises(workout.id);

  return (
    <button
      type="button"
      className="border p-4 shadow-lg shadow-slate-300 h-max"
    >
      <h1 className="font-bold">Workout: {workout.id}</h1>
      <p>{workout.notes}</p>
      <div className="flex gap-4">
        <p>{workout.date.toLocaleDateString()}</p>
        <p>{workout.time.toString()}</p>
        <p>{formatDuration(workout.duration)}</p>
      </div>

      <div className="mt-4">
        {exercises.map((exercise) => (
          <WorkoutExercise key={exercise.id} {...exercise} />
        ))}
      </div>
    </button>
  );
}
