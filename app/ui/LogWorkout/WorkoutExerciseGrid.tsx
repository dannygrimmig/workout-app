import * as React from "react";

import { Exercise, Set, Workout_Exercise } from "@/app/lib/definitions";
import { SelectWorkout } from "./SelectWorkout";

type WorkoutExerciseGridProps = {
  workoutExercises: Workout_Exercise[];
  exercises: Exercise[];
  sets: Set[];
  nextSetId: number;
  updateWorkoutExercise: (
    workoutExerciseId: number,
    updatedExerciseId: number
  ) => void;
  handleAddWorkout: () => void;
  handleAddSet: (newSet: Set) => void;
  handleUpdateSetWeight: (setId: number, newWeight: number) => void;
  handleUpdateSetReps: (setId: number, newReps: number) => void;
};

export function WorkoutExerciseGrid(props: WorkoutExerciseGridProps) {
  const {
    workoutExercises,
    sets,
    nextSetId,
    exercises,
    updateWorkoutExercise,
    handleAddWorkout,
    handleAddSet,
    handleUpdateSetWeight,
    handleUpdateSetReps,
  } = props;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workoutExercises.map((workoutExercise: Workout_Exercise) => (
        <WorkoutExerciseCard
          key={workoutExercise.id}
          exercises={exercises}
          workoutExercise={workoutExercise}
          sets={sets.filter(
            (set) => set.workout_exercise_id === workoutExercise.id
          )}
          nextSetId={nextSetId}
          onExerciseSelect={(updatedExderciseId: number) =>
            updateWorkoutExercise(workoutExercise.id, updatedExderciseId)
          }
          handleAddSet={(newSet: Set) => handleAddSet(newSet)}
          handleUpdateSetWeight={(setId: number, newReps: number) =>
            handleUpdateSetWeight(setId, newReps)
          }
          handleUpdateSetReps={(setId: number, newWeight: number) =>
            handleUpdateSetReps(setId, newWeight)
          }
        />
      ))}

      <button
        onClick={handleAddWorkout}
        className="bg-sky-300 hover:bg-sky-500 p-2 shadow-[4px_4px] shadow-black border border-black h-max"
      >
        Add Workout Exercise
      </button>
    </div>
  );
}

type WorkoutExerciseCardProps = {
  exercises: Exercise[];
  workoutExercise: Workout_Exercise;
  sets: Set[];
  nextSetId: number;
  onExerciseSelect: (updatedExderciseId: number) => void;
  handleAddSet: (newSet: Set) => void;
  handleUpdateSetWeight: (setId: number, newWeight: number) => void;
  handleUpdateSetReps: (setId: number, newReps: number) => void;
};

export function WorkoutExerciseCard(props: WorkoutExerciseCardProps) {
  // imported
  const {
    exercises,
    workoutExercise,
    sets,
    nextSetId,
    onExerciseSelect,
    handleAddSet,
    handleUpdateSetWeight,
    handleUpdateSetReps,
  } = props;

  // managed
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [isSelectingWorkout, setIsSelectngWorkout] =
    React.useState<boolean>(false);
  const [exerciseName, setExerciseName] =
    React.useState<string>("Select Exercise");

  const addSet = () => {
    const newSet = {
      id: nextSetId,
      order_index: sets.length + 1,
      reps: sets[sets.length - 1]?.reps || 0,
      workout_exercise_id: workoutExercise.id,
      weight: sets[sets.length - 1]?.weight || 0,
    };

    handleAddSet(newSet);
  };

  return (
    <form className="p-4 shadow-[4px_4px] shadow-black border border-black flex flex-col h-max">
      {/* Select Exercise / Close Card */}
      <header className="flex justify-between">
        <div>
          <p className="text-xs">Exercise</p>
          <h2
            className="font-bold cursor-pointer"
            onClick={() => setIsSelectngWorkout(true)}
          >
            {exerciseName}
          </h2>
        </div>

        {isSelectingWorkout && (
          <SelectWorkout
            isOpen={isSelectingWorkout}
            onClose={() => setIsSelectngWorkout(false)}
            exercises={exercises}
            onSelectWorkout={(workout: Exercise, name: string) => {
              onExerciseSelect(workout.id);
              setExerciseName(name);
            }}
          />
        )}

        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "↑" : "↓"}
        </button>
      </header>

      {/* Card Contents */}
      <div className={`${!isOpen ? "h-0 collapse" : "flex flex-col gap-2"}`}>
        <table className={`w-full table-fixed`}>
          <thead>
            <tr className="text-left">
              <th className="font-normal">set</th>
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
                  handleUpdateSetWeight(set.id, newWeight)
                }
                onSetRepsUpdate={(newReps) =>
                  handleUpdateSetReps(set.id, newReps)
                }
              />
            ))}
          </tbody>
        </table>

        <button
          onClick={addSet}
          type="button"
          className="bg-sky-600 hover:bg-sky-700 text-white shadow-[4px_4px] shadow-black border border-black p-1 w-full"
        >
          Add Set
        </button>
      </div>
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
  const isGray = set.order_index % 2 != 0;

  return (
    <tr className={`${isGray && "bg-slate-200"}`}>
      <td>{set.order_index}</td>
      <td>
        <input
          className="w-full bg-inherit"
          type="number"
          inputMode="numeric"
          value={set.weight}
          onChange={(e) => onSetWeightUpdate(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          className="w-full bg-inherit"
          type="number"
          inputMode="numeric"
          value={set.reps}
          onChange={(e) => onSetRepsUpdate(e.target.valueAsNumber)}
        />
      </td>
    </tr>
  );
}
