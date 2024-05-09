// Assuming you have a type definition for PostgresInterval
export type PostgresInterval = {
  hours: number;
  minutes: number;
  seconds: number;
  [key: string]: number; // Allow other properties
};
