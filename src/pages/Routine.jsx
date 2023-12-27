import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import ExerciseSection from "../components/ExerciseSection";

function Routine() {
    const {routineId} = useParams();
const [exerciseList, setExerciseList] = useState([])
    useEffect(()=>{
        // fetch routine name & exercise list from routines table 

        //update the exerciseList


    },[])
  return (
    <div>
        
        <p>Routine - {routineId}</p>
        {/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}
    </div>
  )
}

export default Routine