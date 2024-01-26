import { useState,useRef } from "react";
import { sets } from "./ExerciseSection";
import db from "../../db";


export default function Set({ exerciseName, setType, weight, units, reps, RepType, editMode }) {

  const [edit, setEdit] = useState(editMode || false)
  const [setTypeValue, setSetTypeValue] = useState(setType || "M");
  const [weightValue, setWeightValue] = useState(weight || '');
  const [weightUnits, setWeightUnits] = useState(units || "Kg");
  const [repsValue, setRepsValue] = useState(reps || 1);
  const [repType, setRepType] = useState(RepType || "FR");
  const [rest, setRest] = useState(0)
  // function handleInputChange(event, inputName) {
  //   const { value } = event.target;
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [inputName]: value
  //   }));
  // }

  // function handleKeyboard() {
  //     KeyboardVisibility.value = true;
  // }
  const weightRef = useRef(null);
  const weightUnitsRef = useRef(null);
  const repsRef = useRef(null);

  async function handleAdd() {
    const temp = {
      setTypeValue,
      weightValue,
      weightUnits,
      repsValue,
      repType,
      rest,
      date: new Date(),
      exerciseName,


    }
    sets.value.set([...sets.value , temp])

    const id = await db.sets.add(temp)
    console.log(id);
    // Resetting fields
    setSetTypeValue("M");
    setWeightValue("");
    setWeightUnits("Kg");
    setRepsValue(1);
    setRepType("FR");
    setRest(0);
  }
  return (
    edit ?
      <div className='flex justify-between gap-2'>

        <select
          className="p-1 w-1/6"
          name='setType'
          value={setTypeValue}
          onChange={e => setSetTypeValue(e.target.value)}
        >
          <option value="M">M</option>
          <option value="W">W</option>
          <option value="SS">SS</option>
          <option value="D">D</option>
        </select>

        <input
          type="number"
          className='w-1/3'
          name='weight'
          value={weightValue}
          onChange={e => setWeightValue(e.target.value)}
          ref={weightRef}
        />
        <select
          className="p-1 w-1/6"
          name='weightUnits'
          value={weightUnits}
          onChange={e => setWeightUnits(e.target.value)}
          ref={weightUnitsRef}
        >
          <option value="Kg" >Kg</option>
          <option value="lbs" >lbs</option>
        </select>
        x
        <input
          type="number"
          className='w-1/3'
          name='reps'
          value={repsValue}
          onChange={e => setRepsValue(e.target.value)}
          ref={repsRef}
        />
        <select
          className="p-1 w-1/3"
          name="repType"
          value={repType}
          onChange={e => setRepType(e.target.value)}
        >
          <option value="FR">FR</option>
          <option value="PR">PR</option>
          <option value="N">N</option>
          <option value="S">S</option>
        </select>
        <div className="suggestions"></div>


        <button onClick={handleAdd}>add</button>
        <button onClick={() => { setEdit(false) }}>update</button>
      </div> :
      <div className='flex justify-around items-center '>


        <p className='text-center'>
          {`${setTypeValue} ${weightValue} ${weightUnits} * ${repsValue} ${repType}`}
        </p>
        <button onClick={() => { setEdit(true) }}> edit</button>
      </div>
  )


}