import { NewWorkout } from "../ui/Dashboard/NewWorkout";
import { SignOutButton } from "../ui/Dashboard/signoutButton";
import { getUser } from "../lib/data";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="w-full min-h-[calc(100vh-74px)] grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-8 p-2 sm:p-8">
      <GridItem link="history" className="md:col-span-2 md:row-span-2">
        <h1 className="font-bold">Workout Tracking App</h1>
        <p>🚧 work in progress</p>
        <p>📈 data analytics to come here</p>
      </GridItem>

      <GridItem link="add">
        <h1 className="font-bold">Current User 🏋️</h1>
        <p>id: {user.id}</p>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
        <SignOutButton />
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
