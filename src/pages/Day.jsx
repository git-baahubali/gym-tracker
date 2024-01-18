import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';
import db from "../../db";

//*Story
// In the Day component, use the passed routine ID to load the routine's exercises into the day's entry in the database. If the day entry already exists, update it; if not, create a new entry.
// Reactive Data Fetching: useLiveQuery is used to fetch the day's data reactively, ensuring the UI is always up-to-date with the database.
// Day Initialization: If dayData doesn't exist for the given date, a new entry is created with the exercises from the selected routine.
// Validation: The date string from the URL is validated to ensure it represents a valid date.

//*Code starts here
function Day() {
    console.log("Day render");
    // get date from url and 
    // get routineId from state send by routine 
    const { date: dateString } = useParams();
    const date = new Date(dateString);
    const { state } = useLocation();
    const { routineId, routineName } = state || {};
    let routinesThere = true

    // get day data from db using the date .
    // since date in db has time component also you need to specify "i want data for the entire day"
    const dayData = useLiveQuery(() => {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        return db.days
            .where('date')
            .between(startDate, endDate)
            .first(); // Fetch the day data if exists
    }, [dateString]);


    useEffect(() => {

        (async () => {
            //check if validate date from url & confirm dayData exists
            // isNaN(...) function is used to check if .getTime() returned a valid number. If date.getTime() is NaN, it means the date is not a valid date, and therefore isNaN(date.getTime()) will be true. The ! operator negates this, so !isNaN(date.getTime()) will be false for an invalid date, meaning the code inside the if block will not run for an invalid date.
            if (!isNaN(date.getTime())) {
                // If the dayData does not exist, create a new entry for that day
                if (!dayData) {
                    try {
                        const routine = await db.routines.get(routineId)
                        // Check if Routine Exists: Before trying to map over routine.exercises, it checks if routine is not undefined and if routine.exercises is an array.
                        if (routine && Array.isArray(routine.exercises)){
                            await db.days.add({
                                date: new Date(dateString),
                                workoutRoutineId: routineId,
                                exerciseSections: routine.exercises.map(exerciseId => ({
                                    exerciseId,
                                    sets: [] // Initialize with no sets
                                })),
                            });
                        } else {
                            // Routine does not exist or does not have exercises
                            // Handle this scenario appropriately (e.g., show a message or create an empty day entry)
                            routinesThere = false //routinesThere is used to render message
                        }
                    } catch (error) {
                        console.error('Error adding day:', error);
                    }
                }

            } else
                console.error('Invalid date string:', dateString);
        })()
    }, [dayData, date, dateString]);


    const navigateToDay = (date) => {
        const dateString = date.toISOString().split('T')[0]; // Extract date part only
        navigate(`/day/${dateString}`);
    };


    return (
        <div><h1>Day -{dateString}</h1>
            <div>
                render exerciseSections from db
            </div>
            {!routinesThere &&<p>No exercises in Routine to display</p>}
            <div>add Exercise today Component</div>
        </div>

    )
}

export default Day

