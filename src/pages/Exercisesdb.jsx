import React,{useState} from 'react'
import { Signal } from '@preact/signals-react'

const allExercises = Signal([]);
function Exercisesdb() {
const [name, setName] = useState('')
    useEffect(()=>{
        // fetch all exercises from db 
        // assign them to allExercises
    },[])

    function validateName (name){
        //rules for validation
        // code for validation 
        return true/false
    }
function handleAddExercise() {

    if (validateName("name"))
    {   
        // add to db
        //Add exercise to allExercises
        // useEffect will trigger & take care of updating 
    } 
}
  return (
    <div>
        <h1>List of exercises</h1>
        <form action="" onSubmit={handleAddExercise}>
        <input type="text" onChange={e => {setName(e.target.value)}} value={name}/>

        <button >add exercise</button>
        </form>
    </div>
  )
}

export default Exercisesdb