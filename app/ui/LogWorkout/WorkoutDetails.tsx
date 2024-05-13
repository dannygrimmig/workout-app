import { Workout } from "@/app/lib/definitions";

type WorkoutDetailsProps = {
  workout: Workout;
  updateWorkout: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function WorkoutDetails(props: WorkoutDetailsProps) {
  const { workout, updateWorkout } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 items-end">
      <input
        className="bg-inherit cursor-pointer p-4 shadow-[4px_4px] shadow-black border border-black w-full"
        id="date"
        name="date"
        type="date"
        value={workout.date.toString()}
        onChange={(e) => updateWorkout(e)}
      />

      <input
        className="bg-inherit cursor-pointer p-4 shadow-[4px_4px] shadow-black border border-black w-full"
        type="time"
        id="time"
        name="time"
        value={workout.time}
        onChange={(e) => updateWorkout(e)}
      />

      <input
        className="bg-inherit cursor-pointer p-4 shadow-[4px_4px] shadow-black border border-black col-span-2 sm:col-span-1"
        type="text"
        placeholder="notes"
        id="notes"
        name="notes"
        value={workout.notes}
        onChange={(e) => updateWorkout(e)}
      />
    </div>
  );
}
