import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";
import Set from "../components/Set";
import { effect, signal } from "@preact/signals-react";
import ExerciseSelectionDrawer from "@/components/ExerciseSelectionDrawer";


function Routine() {
  console.log("Routine render");
  const { routineId } = useParams();
  const [routine, setRoutine] = useState({ name: 'Loading...', id: "Loading", exercises: [] })

  useEffect(() => {
    // fetch routine name  
    db.routines.get(parseInt(routineId)).then(data => {
      //  //console.log(data);
      setRoutine(prev => { return { ...prev, ...data } })
      //// setRoutine(data)
    })
    //fetch exercise list from routines table
    db.routines.get(routineId).then(data => {
      // //console.log(data)
      db.exercises.where('id').anyOf(data.exerciseId).toArray().then(data => {
        setRoutine(prev => { return { ...prev, exercises: data } })
      })
    })

  }, [])
  console.log("Routine :", routine);
  return (
    <div>

      <p>{routine.name}</p>

      {/* {routine.exercises.map(x => <ExerciseSection editMode={false}/>)} */}
      <ExerciseSelectionDrawer existingExercises = {routine.exercises} />
      {routine.exercises.map((x,index)=> <ExerciseSection name={x.name} key={index} />)}
      

    </div>
  )
}

export default Routine