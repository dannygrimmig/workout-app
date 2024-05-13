import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium",
};

export default function page() {
  return (
    <main className="w-full min-h-[calc(100vh-74px)] p-8">
      <h1 className="font-bold text-4xl mb-4">Premium Subscription</h1>

      <ul>
        <li>
          💬 Feed | See / share workouts from friends in a strava-esc feed page
        </li>
        <li>📊 Data Analytics | See analytics based on each exercise</li>
        <li>
          🥅 Goals | Set a weight / rep / etc goal and a date. track your
          progress against target expectations
        </li>
      </ul>
    </main>
  );
}
