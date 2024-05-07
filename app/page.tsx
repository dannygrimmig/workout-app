import { NewWorkout } from "./ui/Dashboard/NewWorkout";

export default function Home() {
  return (
    <main className="w-full min-h-[calc(100vh-74px)] grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-8 p-8">
      <GridItem
        link="history"
        className="md:col-span-2 md:row-span-2"
      ></GridItem>
      <GridItem link="add">
        <NewWorkout />
      </GridItem>
      <GridItem link="profile"></GridItem>
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
      className={`${className} rounded-2xl p-8 shadow-lg border shadow-slate-300`}
    >
      {children}
    </div>
  );
}
