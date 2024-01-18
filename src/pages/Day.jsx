import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLiveQuery } from 'dexie-react-hooks';
import db from "../../db";

function Day() {
    // get date from url
    const { date: dateString } = useParams();
    const date = new Date(dateString);

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
        //check if validate date from url & confirm dayData exists
        if (!isNaN(date.getTime()) && !dayData) {
            // If the dayData does not exist, create a new entry for that day
            db.days.add({
                date: new Date(dateString),
                workoutRoutineId: null, // Set appropriate value or leave null
                exerciseSections: [], // Initialize with no exerciseSections
            });
            // No need to navigate or set state, useLiveQuery will handle the update
        }
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
        <div>add Exercise today Component</div>
        </div>
        
    )
}

export default Day