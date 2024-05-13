"use client";
import * as React from "react";

export function Authentication() {
  // managed
  const [form, setForm] = React.useState({ username: "", password: "" });
  const [isLogIn, setIsLogIn] = React.useState(true);

  // derived
  const actionText = isLogIn ? "Log In" : "Sign Up";

  return (
    <div className="grid sm:grid-cols-10 min-h-screen">
      <div className="sm:col-span-4 lg:col-span-3 h-screen flex flex-col gap-8 justify-center px-4 sm:sticky top-0">
        <div className="flex justify-between">
          <h1 className="text-5xl">{actionText}</h1>
          <h2 className="text-5xl font-header text-slate-800 mb-2 sm:invisible">
            The Logs
          </h2>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={() => console.log("submit")}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              autoComplete="email"
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div>
            <p>Password</p>
            <input
              type="password"
              name="password"
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <button
            type="submit"
            className="block border rounded px-2 py-1 w-max bg-slate-200"
          >
            {actionText}
          </button>
        </form>
        <div className="pt-4 border-t">
          <p>{isLogIn ? "Don't have" : "Already have"} an account?</p>

          <button
            onClick={() => {
              setIsLogIn(!isLogIn);
            }}
            className="p-0 m-0 underline w-max decoration-1 underline-offset-2"
          >
            {isLogIn ? "Create an account" : "Log in"}
          </button>
        </div>
      </div>

      <div className="bg-sky-200 sm:col-span-6 lg:col-span-7 p-8 flex flex-col gap-8">
        <div>
          <h2 className="text-5xl font-header text-slate-800 mb-2">The Logs</h2>
          <p>You are going to carry the boats, and THE LOGS</p>
        </div>
      </div>
    </div>
  );
}
