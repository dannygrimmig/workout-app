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

  const addWorkoutExercise = () => {
    setWorkoutExercises([
      ...workoutExercises,
      { id: 0, exercise_id: 1, workout_id: 1 },
    ]);
  };

  return (
    <div>
      <h1 className="font-bold text-4xl mb-4">Log Workout</h1>
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workoutExercises.map((workoutExercise) => (
          <WorkoutExercise
            key={workoutExercise.id}
            exercises={exercises}
            workoutExercise={workoutExercise}
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
};

function WorkoutExercise(props: WorkoutExerciseProps) {
  // imported
  const { exercises, workoutExercise } = props;

  // managed
  const [sets, setSets] = React.useState<Set[]>([]);

  const addWorkoutExercise = () => {
    setSets([
      ...sets,
      {
        id: sets.length + 1,
        order_index: 1,
        reps: 10,
        workout_exercise_id: workoutExercise.id,
        weight: 25,
      },
    ]);
  };
  return (
    <div className="p-4 shadow-[4px_4px] shadow-black border border-black h-max">
      <h2 className="font-bold text-lg">
        <select
          id="exercise"
          name="exercise"
          className="border-0 bg-transparent"
        >
          <option value="">Select Workout</option>
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
            <WorkoutSet key={set.id} {...set} />
          ))}
        </tbody>
      </table>

      <button
        onClick={addWorkoutExercise}
        className="bg-sky-600 shadow-[4px_4px] shadow-black border border-black p-1 self-end"
      >
        Add Set
      </button>
    </div>
  );
}

function WorkoutSet(set: Set) {
  const isGray = set.id % 2 != 0;
  return (
    <tr>
      <td className={`${isGray && "bg-slate-200"}`}>{set.id}</td>
      <td className={`${isGray && "bg-slate-200"}`}>
        <input className="w-full bg-inherit" type="number" value={set.weight} />
      </td>
      <td className={`${isGray && "bg-slate-200"}`}>
        <input className="w-full bg-inherit" type="number" value={set.reps} />
      </td>
    </tr>
  );
}
