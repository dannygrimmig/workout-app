"use client";
import * as React from "react";

import { Exercise, Set, Workout_Exercise } from "@/app/lib/definitions";

type LogWorkoutProps = {
  exercises: Exercise[];
};

export function LogWorkout(props: LogWorkoutProps) {
  // imported
  const { exercises } = props;

  // managed
  const [workoutExercises, setWorkoutExercises] = React.useState<
    Workout_Exercise[]
  >([]);

  // add workout exercise to workout
  const addWorkoutExercise = () => {
    setWorkoutExercises([
      ...workoutExercises,
      { id: workoutExercises.length + 1, exercise_id: 0, workout_id: 1 },
    ]);
  };

  // update workout exercise on exercise change
  const updateWorkoutExercise = (
    workoutExerciseId: number,
    updatedExderciseId: number
  ) => {
    const newState = workoutExercises.map(
      (workoutExercise: Workout_Exercise) => {
        if (workoutExercise.id === workoutExerciseId) {
          return { ...workoutExercise, exercise_id: updatedExderciseId };
        } else {
          return workoutExercise;
        }
      }
    );

    setWorkoutExercises(newState);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 items-end">
        <input
          className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
          id="date"
          name="date"
          type="date"
        />

        <input
          className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
          type="text"
          placeholder="notes"
          id="notes"
          name="notes"
        />

        <input
          className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
          type="time"
          id="time"
          name="time"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workoutExercises.map((workoutExercise) => (
          <WorkoutExercise
            key={workoutExercise.id}
            exercises={exercises}
            workoutExercise={workoutExercise}
            onExerciseSelect={(updatedExderciseId: number) =>
              updateWorkoutExercise(workoutExercise.id, updatedExderciseId)
            }
          />
        ))}
        <button
          onClick={addWorkoutExercise}
          className="bg-sky-200 p-2 shadow-[4px_4px] shadow-black border border-black h-max"
        >
          Add Workout Exercise
        </button>
      </div>
    </div>
  );
}

type WorkoutExerciseProps = {
  exercises: Exercise[];
  workoutExercise: Workout_Exercise;
  onExerciseSelect: (updatedExderciseId: number) => void;
};

function WorkoutExercise(props: WorkoutExerciseProps) {
  // imported
  const { exercises, workoutExercise, onExerciseSelect } = props;

  // managed
  const [sets, setSets] = React.useState<Set[]>([]);

  const addSet = () => {
    setSets([
      ...sets,
      {
        id: sets.length + 1,
        order_index: sets.length + 1,
        reps: sets[sets.length - 1]?.reps || 0,
        workout_exercise_id: workoutExercise.id,
        weight: sets[sets.length - 1]?.weight || 0,
      },
    ]);
  };

  const updateSetWeight = (setId: number, newWeight: number) => {
    const newState = sets.map((set: Set) => {
      if (set.id === setId) {
        return { ...set, weight: newWeight };
      } else {
        return set;
      }
    });

    setSets(newState);
  };

  const updateSetReps = (setId: number, newReps: number) => {
    const newState = sets.map((set: Set) => {
      if (set.id === setId) {
        return { ...set, reps: newReps };
      } else {
        return set;
      }
    });

    setSets(newState);
  };

  return (
    <form className="p-4 shadow-[4px_4px] shadow-black border border-black flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-lg">
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
        </h2>

        <table className=" w-full table-fixed mb-2">
          <thead>
            <tr className="text-left">
              <th className="font-normal">id</th>
              <th className="font-normal">weight</th>
              <th className="font-normal">reps</th>
            </tr>
          </thead>

          <tbody>
            {sets.map((set) => (
              <WorkoutSet
                key={set.id}
                set={set}
                onSetWeightUpdate={(newWeight) =>
                  updateSetWeight(set.id, newWeight)
                }
                onSetRepsUpdate={(newReps) => updateSetReps(set.id, newReps)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addSet}
        type="button"
        className="bg-sky-600 shadow-[4px_4px] shadow-black border border-black p-1"
      >
        Add Set
      </button>
    </form>
  );
}

type WorkoutSetProps = {
  set: Set;
  onSetWeightUpdate: (newWeight: number) => void;
  onSetRepsUpdate: (newReps: number) => void;
};

function WorkoutSet(props: WorkoutSetProps) {
  // imported
  const { set, onSetWeightUpdate, onSetRepsUpdate } = props;

  // derived
  const isGray = set.id % 2 != 0;

  return (
    <tr>
      <td className={`${isGray && "bg-slate-200"}`}>{set.id}</td>
      <td className={`${isGray && "bg-slate-200"}`}>
        <input
          className="w-full bg-inherit"
          type="number"
          value={set.weight}
          onChange={(e) => onSetWeightUpdate(e.target.valueAsNumber)}
        />
      </td>
      <td className={`${isGray && "bg-slate-200"}`}>
        <input
          className="w-full bg-inherit"
          type="number"
          value={set.reps}
          onChange={(e) => onSetRepsUpdate(e.target.valueAsNumber)}
        />
      </td>
    </tr>
  );
}
