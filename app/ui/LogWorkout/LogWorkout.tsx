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
      <div className="flex gap-4 mb-4 items-end">
        <input className="font-bold text-4xl" id="date" type="date" />

        <input type="text" placeholder="notes..." id="notes" />

        <input type="time" />

        <p>duration</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {workoutExercises.map((workoutExercise) => (
          <WorkoutExercise key={workoutExercise.id} {...workoutExercise} />
        ))}
        <button
          onClick={addWorkoutExercise}
          className="bg-sky-200 p-2 border border-black h-max"
        >
          Add Workout Exercise
        </button>
      </div>
    </div>
  );
}

function WorkoutExercise(workoutExercise: Workout_Exercise) {
  // managed
  const [sets, setSets] = React.useState<Set[]>([]);

  const addWorkoutExercise = () => {
    setSets([
      ...sets,
      {
        id: 0,
        order_index: 1,
        reps: 10,
        workout_exercise_id: workoutExercise.id,
        weight: 25,
      },
    ]);
  };
  return (
    <div className="border p-4 shadow-lg shadow-slate-300 h-max">
      <h2>Workout Exercise: {workoutExercise.exercise_id}</h2>

      <div className="flex flex-col gap-4 mb-2">
        {sets.map((set) => (
          <WorkoutSet key={set.id} {...set} />
        ))}
      </div>

      <button
        onClick={addWorkoutExercise}
        className="bg-sky-600 border border-black p-1"
      >
        Add Set
      </button>
    </div>
  );
}

function WorkoutSet(set: Set) {
  return (
    <div className="flex gap-2">
      <p>id: {set.id}</p>
      <p>weight: {set.weight}</p>
      <p>reps: {set.reps}</p>
    </div>
  );
}
