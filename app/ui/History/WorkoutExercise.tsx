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
        <p className="font-normal">{currentExercise?.name}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th className="font-light pr-2">reps</th>
            <th className="font-light">weight</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => (
            <tr key={set.id}>
              <td>{set.reps}</td>
              <td>{set.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
