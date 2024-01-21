import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';
import db from "../../db";
import { useNavigate } from "react-router-dom";
import ExerciseSection from "@/components/ExerciseSection";
import { startOfDay, endOfDay, addMinutes, isSameDay } from 'date-fns';


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
    const { date: dateStringFromURL } = useParams();
    const { state } = useLocation();
    const { routineId, routineName } = state || {};
    console.log("routine Id: ", routineId);

    // Define the timezone offset for IST (UTC+5:30)
    const timezoneOffset = 330; // 5 hours and 30 minutes in minutes


    // Parse the date from the URL and convert it to IST
    const parsedDateUTC = new Date(dateStringFromURL);
    const parsedDateIST = addMinutes(parsedDateUTC, timezoneOffset);
    const date = startOfDay(parsedDateIST);
    const today = startOfDay(addMinutes(new Date(), timezoneOffset));

    // get day data from db using the date .
    // since date in db has time component also you need to specify "i want data for the entire day"
    const dayData = useLiveQuery(() => {
        const startDate = startOfDay(date);
        const endDate = endOfDay(date);

        return db.days
            .where('date')
            .between(startDate, endDate)
            .first(); // Fetch the day data if exists
    }, [dateStringFromURL]);
    console.log("dayData: ",dayData);
    const hasExercises = dayData && Array.isArray(dayData.exerciseSections) && dayData.exerciseSections.length > 0;

    useEffect(() => {

        (async () => {
            //check if validate date from url & confirm dayData exists
            // isNaN(...) function is used to check if .getTime() returned a valid number. If date.getTime() is NaN, it means the date is not a valid date, and therefore isNaN(date.getTime()) will be true. The ! operator negates this, so !isNaN(date.getTime()) will be false for an invalid date, meaning the code inside the if block will not run for an invalid date.
            if (!isNaN(date.getTime()) && routineId && !dayData) {
                console.log("first if");
                // If the dayData does not exist, create a new entry for that day
                // Only add new day data if the navigated date is today
                console.log(date,today);
                if (isSameDay(date, today)) {
                    console.log('date okay if');
                    try {
                        const routine = await db.routines.get(routineId)
                        console.log(routine);
                        // Check if Routine Exists: Before trying to map over routine.exercises, it checks if routine is not undefined and if routine.exercises is an array.
                        if (routine && Array.isArray(routine.exercises)) {
                            console.log('3rd if');
                            const exercises = await db.exercises.where('id').anyOf(routine.exercises).toArray();
                            const exerciseSections = exercises.map(exercise => ({
                                exerciseId: exercise.id,
                                exerciseName: exercise.name, // Include name
                                sets: []
                            }));
                            await db.days.add({
                                date: new Date(dateStringFromURL),
                                workoutRoutineId: routineId,
                                exerciseSections,
                            });
                        } else if (routine.exercises.length == 0) {
                            // Routine does not exist or does not have exercises
                            // Handle this scenario appropriately (e.g., show a message or create an empty day entry)

                        }
                        else {
                            console.log("Not able to add day Data");
                        }
                    } catch (error) {
                        console.error('Error adding day:', error);
                    }
                }
            } else {
                if (isNaN(date.getTime())) {
                    console.error('Invalid date string:', dateStringFromURL);
                }
                if (!routineId) {
                    console.error('Routine ID is not provided or invalid');
                }
            }

        })()
    }, [dayData, date, routineId, dateStringFromURL]);


    const navigateToDay = (date) => {
        const dateStringFromURL = date.toISOString().split('T')[0]; // Extract date part only
        navigate(`/day/${dateStringFromURL}`);
    };


    return (
        <div><h1>Day -{dateStringFromURL}</h1>
            <div>
                {/* {dayData.exerciseSections.map((x,index) => <ExerciseSection key={index} name={'name'} />)} */}
            </div>
            {
                hasExercises ? (
                    // Render exercise sections if they exist
                    <div className=" ga">
                        {dayData.exerciseSections.map((exerciseSection, index) => (
                            <ExerciseSection key={index} {...exerciseSection} name={exerciseSection.exerciseName}/>
                        ))}
                    </div>
                ) : (
                    // Render a message if no exercises are done on the day
                    <div>No exercises done today.</div>
                )
            }
            {/* <SearchExercise /> */}
        </div>

    )
}

export default Day

