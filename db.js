// data base

import Dexie from "dexie";

export const db = new Dexie("GymDairy");

db.version(8).stores({
//   rest: "++id, time, date, time",
exercises: "++id, name, description, category",
routines: "++id, name,exerciseId",
sets: "++id, weight, weightType, reps, repType, duration, type, date, timeUnderTension, rest",
exerciseSections: "++id, exerciseId, exerciseName, date, sets",
days: '++id, date, workoutRoutineId, exerciseSections',
});
export default db;



  
// Function to initialize exercises
export async function initializeExercises() {
    const count = await db.exercises.count();
    if (count === 0) {
        console.log("run");
      // No exercises in the database, load them
      const exercises = [
        { id: 1, name: 'Bench Press', category: 'Chest' },
        { id: 2, name: 'Flat Bench Press', category: 'Chest' },
        { id: 3, name: 'Incline Bench Press', category: 'Chest' },
        { id: 4, name: 'Decline Bench Press', category: 'Chest' },
        { id: 5, name: 'Dumbbell Press', category: 'Chest' },
        { id: 6, name: 'Flat Dumbbell Press', category: 'Chest' },
        { id: 7, name: 'Incline Dumbbell Press', category: 'Chest' },
        { id: 8, name: 'Decline Dumbbell Press', category: 'Chest' },
        { id: 9, name: 'Chest Fly', category: 'Chest' },
        { id: 10, name: 'Flat Bench Fly', category: 'Chest' },
        { id: 11, name: 'Incline Bench Fly', category: 'Chest' },
        { id: 12, name: 'Decline Bench Fly', category: 'Chest' },
        { id: 13, name: 'Push-Up', category: 'Chest' },
        { id: 14, name: 'Standard Push-Up', category: 'Chest' },
        { id: 15, name: 'Wide Grip Push-Up', category: 'Chest' },
        { id: 16, name: 'Diamond Push-Up', category: 'Chest' },
        { id: 17, name: 'Pull-Up', category: 'Back' },
        { id: 18, name: 'Wide Grip Pull-Up', category: 'Back' },
        { id: 19, name: 'Close Grip Pull-Up', category: 'Back' },
        { id: 20, name: 'Chin-Up', category: 'Back' },
        { id: 21, name: 'Lat Pulldown', category: 'Back' },
        { id: 22, name: 'Wide Grip Lat Pulldown', category: 'Back' },
        { id: 23, name: 'Close Grip Lat Pulldown', category: 'Back' },
        { id: 24, name: 'Reverse Grip Lat Pulldown', category: 'Back' },
        { id: 25, name: 'Barbell Row', category: 'Back' },
        { id: 26, name: 'Dumbbell Row', category: 'Back' },
        { id: 27, name: 'Cable Row', category: 'Back' },
        { id: 28, name: 'Deadlift', category: 'Back' },
        { id: 29, name: 'Conventional Deadlift', category: 'Back' },
        { id: 30, name: 'Sumo Deadlift', category: 'Back' },
        { id: 31, name: 'Romanian Deadlift', category: 'Back' },
        { id: 32, name: 'Overhead Press', category: 'Shoulders' },
        { id: 33, name: 'Barbell Overhead Press', category: 'Shoulders' },
        { id: 34, name: 'Dumbbell Overhead Press', category: 'Shoulders' },
        { id: 35, name: 'Lateral Raise', category: 'Shoulders' },
        { id: 36, name: 'Dumbbell Lateral Raise', category: 'Shoulders' },
        { id: 37, name: 'Cable Lateral Raise', category: 'Shoulders' },
        { id: 38, name: 'Front Raise', category: 'Shoulders' },
        { id: 39, name: 'Dumbbell Front Raise', category: 'Shoulders' },
        { id: 40, name: 'Cable Front Raise', category: 'Shoulders' },
        { id: 41, name: 'Rear Delt Fly', category: 'Shoulders' },
        { id: 42, name: 'Dumbbell Rear Delt Fly', category: 'Shoulders' },
        { id: 43, name: 'Cable Rear Delt Fly', category: 'Shoulders' },
        { id: 44, name: 'Bicep Curl', category: 'Arms' },
        { id: 45, name: 'Barbell Curl', category: 'Arms' },
        { id: 46, name: 'Dumbbell Curl (Right Hand)', category: 'Arms' },
        { id: 47, name: 'Dumbbell Curl (Left Hand)', category: 'Arms' },
        { id: 48, name: 'Hammer Curl', category: 'Arms' },
        { id: 49, name: 'Tricep Extension', category: 'Arms' },
        { id: 50, name: 'Skull Crusher', category: 'Arms' },
        { id: 51, name: 'Tricep Pushdown', category: 'Arms' },
        { id: 52, name: 'Overhead Tricep Extension', category: 'Arms' },
        { id: 53, name: 'Forearm Curl', category: 'Arms' },
        { id: 54, name: 'Wrist Curl', category: 'Arms' },
        { id: 55, name: 'Reverse Wrist Curl', category: 'Arms' },
        { id: 56, name: 'Squat', category: 'Legs' },
        { id: 57, name: 'Barbell Squat', category: 'Legs' },
        { id: 58, name: 'Dumbbell Squat', category: 'Legs' },
        { id: 59, name: 'Front Squat', category: 'Legs' },
        { id: 60, name: 'Lunges', category: 'Legs' },
        { id: 61, name: 'Barbell Lunges', category: 'Legs' },
        { id: 62, name: 'Dumbbell Lunges', category: 'Legs' },
        { id: 63, name: 'Leg Press', category: 'Legs' },
        { id: 64, name: 'Standard Leg Press', category: 'Legs' },
        { id: 65, name: 'Wide Stance Leg Press', category: 'Legs' },
        { id: 66, name: 'Calf Raise', category: 'Legs' },
        { id: 67, name: 'Standing Calf Raise', category: 'Legs' },
        { id: 68, name: 'Seated Calf Raise', category: 'Legs' },
        { id: 69, name: 'Crunch', category: 'Core' },
        { id: 70, name: 'Standard Crunch', category: 'Core' },
        { id: 71, name: 'Bicycle Crunch', category: 'Core' },
        { id: 72, name: 'Plank', category: 'Core' },
        { id: 73, name: 'Standard Plank', category: 'Core' },
        { id: 74, name: 'Side Plank', category: 'Core' },
        { id: 75, name: 'Leg Raise', category: 'Core' },
        { id: 76, name: 'Hanging Leg Raise', category: 'Core' },
        { id: 77, name: 'Lying Leg Raise', category: 'Core' },
        // Add more exercises here
      ];
      await db.exercises.bulkAdd(exercises);
    }
  }
// Add a new routine
export async function addRoutine(name, exercises) {
    return db.routines.add({ name, exercises });
  }
