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
    db.routines.get(parseInt(routineId)).then(data=> {
      console.log(data);
      // setExerciseList(data)
    })
    
    //update the exerciseList


  }, [])
  return (
    <div>

      <p>Routine - {routineId}</p>
      {/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}

      <form action="" onSubmit={(e) => { handleAddExercise(e) }}>
                <input type="text" placeholder='add new exercise' />
                <button className='px-2 mx-2' >add</button>
            </form>
    </div>
  )
}

export default Routine