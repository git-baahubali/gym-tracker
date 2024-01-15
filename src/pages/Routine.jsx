import { useParams } from "react-router-dom";
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";
import ExerciseSelectionDrawer from "@/components/ExerciseSelectionDrawer";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

function Routine() {
  console.log("Routine render");
  const [name, setName] = useState(null)
  // Extract the 'routineId' parameter from the URL using React Router.
  const { routineId } = useParams();
  // Parse the 'routineId' as a number.
  const routineIdNumber = parseInt(routineId);

 db.routines.get(routineIdNumber).then( response => { setName(response.name) })
  // Query the IndexedDB database to get details related to the routine.
  const routine = useLiveQuery(() => 
    db.routines.get(routineId), [routineIdNumber]);
  
   // Query the IndexedDB database to get exercises associated with the routine.
  const exercises = useLiveQuery(() => 
    routineIdNumber && routine?.exerciseId
      ? db.exercises.where('id').anyOf(routine.exerciseId).toArray()
      : [], [routineIdNumber, routine?.exerciseId]);

  console.log("Routine :", routine);

  return (
    <div>
      {/* Display the routine name or 'Loading...' if not available. */}
      <p>{name || 'Loading...'}</p>

      {/* Render an ExerciseSelectionDrawer component with existing exercises. */}
      <ExerciseSelectionDrawer existingExercises={exercises || []} />

      <div className="flex flex-col gap-2">
        {/* Map and render ExerciseSection components for each exercise. */}
        {exercises?.map((x, index) => <ExerciseSection name={x.name} key={index} />)}
      </div>
    </div>
  );
}

export default Routine;
