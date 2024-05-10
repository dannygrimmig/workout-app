"use client";
import * as React from "react";

import { Exercise, Set, Workout_Exercise } from "@/app/lib/definitions";
import { WorkoutExercise } from "./WorkoutExercise";

export type WorkoutExerciseObject = {
  workoutExercise: Workout_Exercise;
  sets: Set[];
};

type WorkoutCardProps = {
  workout: {
    id: number;
    date: string;
    time: string;
    notes: string;
    user_id: number;
  };
  workoutExercises: WorkoutExerciseObject[];
  exercises: Exercise[];
};

export function WorkoutCard(props: WorkoutCardProps) {
  // imported
  const { workout, workoutExercises, exercises } = props;

  // managed
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="border p-4 shadow-lg shadow-slate-300 h-max text-left hover:shadow-slate-400"
    >
      <h1 className="font-bold">{workout.date}</h1>
      <div className="flex gap-4">
        <p>{workout.notes}</p>
        <p>{workout.time}</p>
      </div>

      {isOpen && (
        <div>
          {workoutExercises.map((workoutExercise) => (
            <WorkoutExercise
              key={workoutExercise.workoutExercise.id}
              workoutExerciseObject={workoutExercise}
              exercises={exercises}
            />
          ))}
        </div>
      )}
    </button>
  );
}
