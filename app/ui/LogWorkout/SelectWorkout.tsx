import * as React from "react";
import { Exercise, Workout_Exercise } from "@/app/lib/definitions";

type SelectWorkoutProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorkout: (workout: Exercise, name: string) => void;
  exercises: Exercise[];
};

export function SelectWorkout(props: SelectWorkoutProps) {
  // imported
  const { isOpen, onSelectWorkout, onClose, exercises } = props;

  // managed
  const [query, setQuery] = React.useState<string>("");

  // derived
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) {
    return <></>;
  } else {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-50 flex p-8">
        <div className="w-full h-full rounded bg-sky-800 p-8 shadow-[4px_4px] shadow-black border border-black overflow-scroll">
          <div className="flex flex-col gap-4">
            <div className="sticky top-0 flex items-center gap-2">
              <input
                autoFocus
                type="text"
                id="exercise_choice"
                name="exercise_choice"
                placeholder="search exercises"
                className="w-full p-2 rounded"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="rounded p-2 bg-sky-900 hover:bg-sky-700"
              >
                close
              </button>
            </div>

            <div>
              <ul>
                {filteredExercises.map((exercise) => (
                  <li key={exercise.id} className="w-full mb-2 text-white">
                    <button
                      type="button"
                      className="w-full bg-sky-900 hover:bg-sky-600 rounded p-2 flex gap-4 items-end"
                      onClick={() => {
                        onSelectWorkout(exercise, exercise.name);
                        onClose();
                      }}
                    >
                      <h3>{exercise.name}</h3>
                      <p className="text-xs">{exercise.body_part}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
<select
            id="exercise"
            name="exercise"
            className="border-0 bg-transparent"
            onChange={(e) => onExerciseSelect(Number(e.target.value))}
          >
            <option value={0}>Select Workout</option>
            {exercises?.map((exercise: Exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>

*/
