import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";
import Set from "../components/Set";
import { effect, signal } from "@preact/signals-react";
import ExerciseSelectionDrawer from "@/components/ExerciseSelectionDrawer";


function Routine() {
  console.log('render');
  const { routineId } = useParams();
  const [routine, setRoutine] = useState({ name: 'Loading...' })

  useEffect(() => {
    // fetch routine name & exercise list from routines table 
    db.routines.get(parseInt(routineId)).then(data => {
      console.log(data);
      setRoutine(data)
    })

    //update the exerciseList

  }, [])
  return (
    <div>

      <p>{routine.name}</p>
      {/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}
      <ExerciseSelectionDrawer />

    </div>
  )
}

export default Routine