import Link from "next/link";
import * as React from "react";

export function NewWorkout() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <h1>New Workout</h1>
      <div className="flex h-full gap-4">
        <NewWorkoutButton type={"primary"} text="From Scratch" link="workout" />
        <NewWorkoutButton
          type={"secondary"}
          text="From Template"
          link="signup"
        />
      </div>
    </div>
  );
}

type NewWorkoutButtonProps = {
  type?: "primary" | "secondary";
  text: string;
  link: string;
};
function NewWorkoutButton(props: NewWorkoutButtonProps) {
  const { type = "primary", text, link } = props;

  const isPrimary = type === "primary";

  return (
    <Link
      href={`/${link}`}
      className={`flex-1 rounded-xl border-2 border-black flex items-center justify-center ${
        isPrimary
          ? " bg-inherit hover:bg-slate-200"
          : "bg-sky-300 hover:bg-sky-500 text-white"
      }`}
    >
      {text}
    </Link>
  );
}
