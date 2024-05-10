import { fetchSets, fetchWorkoutExercises } from "@/app/lib/data";
import { Exercise, Workout, Workout_Exercise } from "@/app/lib/definitions";
import { WorkoutCard } from "./WorkoutCard";

type WorkoutCardContainerProps = {
  workout: Workout;
  exercises: Exercise[];
};

export async function WorkoutCardContainer(props: WorkoutCardContainerProps) {
  // imported
  const { workout, exercises } = props;

  // derived
  const workoutExercises: Workout_Exercise[] = await fetchWorkoutExercises(
    workout.id
  );
  const workoutExercsesObjects = await Promise.all(
    workoutExercises.map(async (exercise: Workout_Exercise) => {
      return {
        workoutExercise: exercise,
        sets: await fetchSets(exercise.id),
      };
    })
  );

  return (
    <WorkoutCard
      workout={{
        id: workout.id,
        date: workout.date.toDateString(),
        time: workout.time.toString(),
        notes: workout.notes,
        user_id: workout.user_id,
      }}
      workoutExercises={workoutExercsesObjects}
      exercises={exercises}
    />
  );
}
