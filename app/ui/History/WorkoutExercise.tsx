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
    <div className="mb-2">
      <div className="flex gap-2">
        <p className="font-normal">{currentExercise?.name}</p>
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr className="text-left">
            <th className="font-normal">set</th>
            <th className="font-normal">weight</th>
            <th className="font-normal">reps</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => {
            const isGray = set.order_index % 2 != 0;

            return (
              <tr key={set.id} className={`${isGray && "bg-slate-200"}`}>
                <td>{set.order_index}</td>
                <td>{set.weight}</td>
                <td>{set.reps}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
