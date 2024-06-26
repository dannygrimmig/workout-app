import { Suspense } from "react";
import { fetchExercises, fetchUserWorkouts, getUser } from "../../lib/data";
import { Exercise, User, Workout } from "../../lib/definitions";
import { WorkoutCardContainer } from "../../ui/History/WorkoutCardContainer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
};

export default function Page() {
  return (
    <main className="w-full min-h-[calc(100vh-74px)] p-2 sm:p-8">
      <h1 className="font-bold text-4xl mb-4">Workout History</h1>

      <Suspense fallback={<div>Loading Grid...</div>}>
        <WorkoutGrid />
      </Suspense>
    </main>
  );
}

async function WorkoutGrid() {
  // imported
  const user: User = await getUser(); //temp
  const workouts: Workout[] = await fetchUserWorkouts(user.id);
  const exercises: Exercise[] = await fetchExercises();

  // derived
  const orderedWorkouts: Workout[] = workouts.sort(
    (a: Workout, b: Workout) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orderedWorkouts.map((workout) => (
        <WorkoutCardContainer
          key={workout.id}
          workout={workout}
          exercises={exercises}
        />
      ))}

      {orderedWorkouts.length <= 0 && (
        <p>No Workout History... add workouts!</p>
      )}
    </div>
  );
}
