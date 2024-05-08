import { CURRENT_USER } from "../lib/constants";
import { fetchExercises } from "../lib/data";
import { Exercise, User } from "../lib/definitions";
import { LogWorkout } from "../ui/LogWorkout/LogWorkout";

export default async function Page() {
  // imported
  const user: User = CURRENT_USER; //temp
  const exercises: Exercise[] = await fetchExercises();

  // derived

  return (
    <div className="w-full min-h-[calc(100vh-74px)] p-8">
      <LogWorkout exercises={exercises} />
    </div>
  );
}
