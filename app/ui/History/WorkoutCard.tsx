import { fetchWorkoutExercises } from "@/app/lib/data";
import { Workout, Workout_Exercise } from "@/app/lib/definitions";
import { WorkoutExercise } from "./WorkoutExercise";

export async function WorkoutCard(workout: Workout) {
  const exercises: Workout_Exercise[] = await fetchWorkoutExercises(workout.id);

  return (
    <button
      type="button"
      className="border p-4 shadow-lg shadow-slate-300 h-max text-left"
    >
      <h1 className="font-bold">{workout.date.toDateString()}</h1>
      <div className="flex gap-4">
        <p>{workout.notes}</p>
        <p>{workout.time.toString()}</p>
      </div>

      <div className="mt-4">
        {exercises.map((exercise) => (
          <WorkoutExercise key={exercise.id} {...exercise} />
        ))}
      </div>
    </button>
  );
}
