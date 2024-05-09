import { Workout } from "@/app/lib/definitions";

type WorkoutDetailsProps = {
  workout: Workout;
  updateWorkout: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function WorkoutDetails(props: WorkoutDetailsProps) {
  const { workout, updateWorkout } = props;

  return (
    <div className="flex gap-4 mb-4 items-end">
      <input
        className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
        id="date"
        name="date"
        type="date"
        value={workout.date.toString()}
        onChange={(e) => updateWorkout(e)}
      />

      <input
        className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
        type="text"
        placeholder="notes"
        id="notes"
        name="notes"
        value={workout.notes}
        onChange={(e) => updateWorkout(e)}
      />

      <input
        className=" bg-inherit p-4 shadow-[4px_4px] shadow-black border border-black"
        type="time"
        id="time"
        name="time"
        value={workout.time}
        onChange={(e) => updateWorkout(e)}
      />
    </div>
  );
}
