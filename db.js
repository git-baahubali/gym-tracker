// data base

import Dexie from "dexie";

export const db = new Dexie("myDatabase");

db.version(2).stores({
//   rest: "++id, time, date, time",
  sets: "++id, weight, weightType, reps, repType, duration, type, date, timeUnderTension, rest",
  exerciseList: "++id, name, description, category",
  exerciseSections: "++id, exerciseId, setIds",
  routines: "++id, name"
});

export default db;


export async function addRoutine(Name) {
    try {
        const id = await db.routines.add({name:Name})
    return id
    } catch (error) {
        console.log(error);
    }
}