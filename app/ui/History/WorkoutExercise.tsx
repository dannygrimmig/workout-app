import { Exercise } from "@/app/lib/definitions";
import { WorkoutExerciseObject } from "./WorkoutCard";

type WorkoutExerciseProps = {
  workoutExerciseObject: WorkoutExerciseObject;
  exercises: Exercise[];
};

export function WorkoutExercise(props: WorkoutExerciseProps) {
  const { workoutExerciseObject, exercises } = props;
  const { workoutExercise, sets } = workoutExerciseObject;

  // derived
  const currentExercise = exercises.find(
    (curr) => curr.id === workoutExercise.exercise_id
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
