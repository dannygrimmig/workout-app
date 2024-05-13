"use client";
import * as React from "react";

import {
  Exercise,
  Set,
  User,
  Workout,
  Workout_Exercise,
} from "@/app/lib/definitions";
import { CURRENT_USER } from "@/app/lib/constants";
import { WorkoutDetails } from "./WorkoutDetails";
import { WorkoutExerciseGrid } from "./WorkoutExerciseGrid";
import { createWorkout } from "@/app/lib/actions";

const WORKOUT_ID = 1;
const EMPTY_WORKOUT = {
  id: WORKOUT_ID,
  date: new Date(),
  notes: "",
  time: 0,
  user_id: CURRENT_USER.id,
};

let WORKOUT_EXERCISE_ID_COUNT = 0;
let SET_ID_COUNT = 0;

type LogWorkoutProps = {
  exercises: Exercise[];
  user: User;
};

export function LogWorkout(props: LogWorkoutProps) {
  // imported
  const { exercises, user } = props;

  // managed
  const [workout, setWorkout] = React.useState<Workout>({
    ...EMPTY_WORKOUT,
    user_id: user.id,
  });

  const [workoutExercises, setWorkoutExercises] = React.useState<
    Workout_Exercise[]
  >([]);

  const [sets, setSets] = React.useState<Set[]>([]);

  // UPDATE WORKOUT
  const updateWorkout = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE WORKOUT_EXERCISES
  const addWorkoutExercise = () => {
    setWorkoutExercises([
      ...workoutExercises,
      {
        id: WORKOUT_EXERCISE_ID_COUNT++,
        exercise_id: 0,
        workout_id: WORKOUT_ID,
      },
    ]);
  };

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

  // UPDATE SETS
  const handleAddSet = (newSet: Set) => {
    setSets([...sets, newSet]);
    SET_ID_COUNT++;
  };

  const handleUpdateSetWeight = (setId: number, newWeight: number) => {
    const newState = sets.map((set: Set) => {
      if (set.id === setId) {
        return { ...set, weight: newWeight };
      } else {
        return set;
      }
    });

    setSets(newState);
  };

  const handleUpdateSetReps = (setId: number, newReps: number) => {
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
    <div>
      <WorkoutDetails
        workout={workout}
        updateWorkout={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateWorkout(e)
        }
      />

      <WorkoutExerciseGrid
        workoutExercises={workoutExercises}
        sets={sets}
        nextSetId={SET_ID_COUNT}
        exercises={exercises}
        updateWorkoutExercise={(a, b) => updateWorkoutExercise(a, b)}
        handleAddWorkout={addWorkoutExercise}
        handleAddSet={(newSet: Set) => handleAddSet(newSet)}
        handleUpdateSetWeight={(setId: number, newWeight) =>
          handleUpdateSetWeight(setId, newWeight)
        }
        handleUpdateSetReps={(setId: number, newReps) =>
          handleUpdateSetReps(setId, newReps)
        }
      />

      <button
        type="button"
        className="bg-sky-200 hover:bg-sky-400 fixed bottom-4 right-4 p-2 shadow-[4px_4px] shadow-black border border-black"
        onClick={() => createWorkout(workout, workoutExercises, sets)}
      >
        Log it!
      </button>
    </div>
  );
}
