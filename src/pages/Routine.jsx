import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";

function Routine() {
  console.log('render');
  const { routineId } = useParams();
  const [exerciseList, setExerciseList] = useState([])

  useEffect(() => {
    // fetch routine name & exercise list from routines table 
    db.routines.where('id').equals('2').toArray().then(data=> {
      console.log(data);
      setExerciseList(data)})
    
    //update the exerciseList


  }, [])
  return (
    <div>

      <p>Routine - {exerciseList}</p>
      {/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}
    </div>
  )
}

export default Routine