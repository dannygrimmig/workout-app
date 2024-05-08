import { fetchExercises, fetchSets } from "@/app/lib/data";
import { Exercise, Set, Workout_Exercise } from "@/app/lib/definitions";

export async function WorkoutExercise(workoutExercise: Workout_Exercise) {
  const sets: Set[] = await fetchSets(workoutExercise.id);
  const exercises: Exercise[] = await fetchExercises();

  // derived
  const currentExercise = exercises.find(
    (exercise) => exercise.id === workoutExercise.exercise_id
  );

  return (
    <div>
      <div className="flex gap-2">
        <p className=" font-normal">{currentExercise?.name}</p>
      </div>

      <div>
        {!!sets && (
          <ul>
            {sets.map((set) => (
              <li key={set.id} className="flex gap-2">
                <p>reps: {set.reps}</p>
                <p>weight: {set.weight}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
