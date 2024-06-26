import { Suspense } from "react";
import { fetchExercises, getUser } from "../../lib/data";
import { Exercise, User } from "../../lib/definitions";
import { LogWorkout } from "../../ui/LogWorkout/LogWorkout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workout",
};

export default function Page() {
  return (
    <div className="w-full min-h-[calc(100vh-74px)] p-2 sm:p-8">
      <h1 className="font-bold text-4xl mb-4">Log Workout</h1>

      <Suspense fallback={<div>Page Loading...</div>}>
        <AsyncContainer />
      </Suspense>
    </div>
  );
}

async function AsyncContainer() {
  // imported
  const exercises: Exercise[] = await fetchExercises();
  const user: User = await getUser(); //temp

  // derived
  return (
    <Suspense fallback={<div>AsyncContainer...</div>}>
      <LogWorkout exercises={exercises} user={user} />
    </Suspense>
  );
}
