import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";
import Set from "../components/Set";
import { Button } from "@/components/ui/button"

function Routine() {
  console.log('render');
  const { routineId } = useParams();
  const [exerciseList, setExerciseList] = useState([])

  useEffect(() => {
    // fetch routine name & exercise list from routines table 
    db.routines.get(routineId).then(data=> {
      console.log(data);
      setExerciseList(data)})
    
    //update the exerciseList


  }, [])
  return (
    <div>

      <p>Routine - {routineId}</p>
      <Button>Click me</Button>
      {/* <Set/> */}
      {/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}
    </div>
  )
}

export default Routine