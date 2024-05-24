export const generateRandomWorkoutData = () => {
  const workoutData = [];

  // Get today's date
  const today = new Date();

  // Calculate the date one year ago
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Loop through each day from one year ago to today
  let currentDate = new Date(oneYearAgo);
  while (currentDate <= today) {
    // Generate a random workout count for the day (between 0 and 5)
    const workoutCount = Math.floor(Math.random() * 6);

    // Format the date (YYYY-MM-DD)
    const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    // Add the data for the day to the workoutData array
    workoutData.push({ date, count: workoutCount });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workoutData;
};
