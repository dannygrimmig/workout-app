import { NewWorkout } from "../ui/Dashboard/NewWorkout";
import { SignOutButton } from "../ui/Dashboard/signoutButton";
import { fetchUserWorkouts, getUser } from "../lib/data";

export default async function Home() {
  const user = await getUser();
  const workouts = await fetchUserWorkouts(user.id);
  const workoutCount = workouts.length;

  return (
    <main className="w-full min-h-[calc(100vh-74px)] grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-8 p-2 sm:p-8">
      <GridItem link="history" className="md:col-span-2 md:row-span-2">
        <h1 className="font-bold">Workout Tracking App</h1>
        <p>🚧 work in progress</p>
        <p>📈 data analytics to come here</p>
      </GridItem>

      <GridItem link="add">
        <div className="flex flex-col gap-2 h-full">
          <h1 className="font-bold">Current User</h1>

          <div className="grid grid-cols-2 h-full">
            <div className="col-span-1 flex flex-col justify-center items-center">
              <p className="p-4 text-6xl underline underline-offset-2 decoration-1 ">
                🏋️
              </p>
              <div className="flex gap-2">
                <p className="font-normal">@{user.name}</p>
                <SignOutButton />
              </div>
            </div>

            <div className="col-span-1">
              <div className="flex flex-col h-full items-center">
                <div className="h-full w-full rounded-full border-2 border-black flex justify-center items-center">
                  <p className="text-2xl font-normal">{workoutCount}</p>
                </div>
                <p>workouts</p>
              </div>
            </div>
          </div>
        </div>
      </GridItem>
      <GridItem link="profile">
        <NewWorkout />
      </GridItem>
    </main>
  );
}

type GridItem = {
  link: string;
  className?: string;
  children?: React.ReactNode;
};

function GridItem(props: GridItem) {
  const { link, className, children } = props;
  return (
    <div
      className={`${className} p-8 shadow-[4px_4px] shadow-black border border-black`}
    >
      {children}
    </div>
  );
}
