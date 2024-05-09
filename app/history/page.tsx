import { Suspense } from "react";
import { CURRENT_USER } from "../lib/constants";
import { fetchUserWorkouts } from "../lib/data";
import { User, Workout } from "../lib/definitions";
import { WorkoutCard } from "../ui/History/WorkoutCard";

export default function Page() {
  return (
    <main className="w-full min-h-[calc(100vh-74px)] p-8">
      <h1 className="text-xl mb-4">workouts</h1>

      <Suspense fallback={<div>Loading Grid...</div>}>
        <WorkoutGrid />
      </Suspense>
    </main>
  );
}

async function WorkoutGrid() {
  // imported
  const user: User = CURRENT_USER; //temp

  // derived
  const workouts: Workout[] = await fetchUserWorkouts(user.id);
  const orderedWorkouts: Workout[] = workouts.sort(
    (a: Workout, b: Workout) => b.date.getTime() - a.date.getTime()
  );

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orderedWorkouts.map((workout) => (
        <WorkoutCard key={workout.id} {...workout} />
      ))}
    </div>
  );
}
