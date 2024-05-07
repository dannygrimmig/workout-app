import { CURRENT_USER } from "../lib/constants";
import {
  fetchUserWorkouts,
  fetchUsers,
  fetchWorkoutExercises,
} from "../lib/data";
import { User, Workout, Workout_Exercise } from "../lib/definitions";
import { formatDuration } from "../lib/helpers";

export default async function Page() {
  // imported
  const user: User = CURRENT_USER;

  // derived
  const workouts: Workout[] = await fetchUserWorkouts(user.id);

  return (
    <main className="w-full min-h-[calc(100vh-74px)] p-8">
      <h1 className="text-xl mb-4">workouts</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} {...workout} />
        ))}
      </div>
    </main>
  );
}

async function WorkoutCard(workout: Workout) {
  const exercises: Workout_Exercise[] = await fetchWorkoutExercises(workout.id);

  return (
    <div className="border p-4 shadow-lg shadow-slate-300">
      <h1>Workout: {workout.id}</h1>
      <p>{workout.notes}</p>
      <div className="flex gap-4">
        <p>{workout.date.toLocaleDateString()}</p>
        <p>{workout.time.toString()}</p>
        <p>{formatDuration(workout.duration)}</p>
      </div>

      {!!exercises && (
        <div>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id} className="flex gap-2">
                <p>id: {exercise.id}</p>
                <p>exercise: {exercise.exercise_id}</p>
                <p>sets: {exercise.sets}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
