import { PostgresInterval } from "./helpers";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Workout = {
  id: number;
  date: Date;
  time: number;
  duration: PostgresInterval;
  notes: string;
  user_id: number;
};

export type Workout_Exercise = {
  id: number;
  workout_id: number;
  exercise_id: number;
};

export type Set = {
  id: number;
  workout_exercise_id: number;
  reps: number;
  weight?: number;
  order_index: number;
};

export type Exercise = {
  id: number;
  name: string;
  body_part: string;
};
