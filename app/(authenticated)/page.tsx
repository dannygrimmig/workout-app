import { NewWorkout } from "../ui/Dashboard/NewWorkout";
import { SignOutButton } from "../ui/Dashboard/signoutButton";
import { fetchUserWorkouts, getUser } from "../lib/data";
import Link from "next/link";
import { AnalyticsContainer } from "../ui/Dashboard/Analytics/AnalyticsContainer";

export default async function Home() {
  const user = await getUser();
  const workouts = await fetchUserWorkouts(user.id);
  const workoutCount = workouts.length;

  return (
    <main className="w-full min-h-[calc(100vh-74px)] sm:grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-8 p-2 sm:p-8">
      <GridItem
        link="history"
        className="md:col-span-2 md:row-span-2 h-[60vh] sm:h-full"
      >
        <div className="flex flex-col gap-2 h-full">
          <h1 className="font-bold">Analytics 🚧</h1>
          <AnalyticsContainer />
        </div>
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

            <div className="">
              <Link
                href={"/history"}
                className="bg-sky-600 hover:bg-sky-800 text-white col-span-1 flex flex-col h-full shadow-[4px_4px] shadow-black border border-black items-center justify-center"
              >
                <p className="text-2xl font-bold">{workoutCount}</p>
                <p>workouts</p>
              </Link>
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
      className={`${className} p-8 shadow-[4px_4px] shadow-black border border-black mb-4 sm:mb-0`}
    >
      {children}
    </div>
  );
}
