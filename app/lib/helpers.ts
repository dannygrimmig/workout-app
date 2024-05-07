// Assuming you have a type definition for PostgresInterval
export type PostgresInterval = {
  hours: number;
  minutes: number;
  seconds: number;
  [key: string]: number; // Allow other properties
};

// Helper function to format duration from PostgresInterval to string
export const formatDuration = (duration: PostgresInterval): string => {
  const { hours = 0, minutes = 0, seconds = 0 } = duration;

  let formattedDuration: string = "";
  if (hours > 0) {
    formattedDuration += `${hours} hour${hours !== 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    formattedDuration += ` ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  if (seconds > 0) {
    formattedDuration += ` ${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return formattedDuration.trim();
};
