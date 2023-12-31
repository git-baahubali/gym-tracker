// import { useState, useEffect } from 'react'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Keyboard from './Keyboard';
import { KeyboardVisibility } from './Keyboard';
import db from '../../db.js';
import { signal } from '@preact/signals-react';
import Set from './Set.jsx';

export const sets = signal([])

function ExerciseSection({name}) {

    async function addRest() {
 
    }
    return (
        <div className='w-[90vw] border-0 bg-sky-900 rounded-xl m-0 '>
            <div className="flex justify-between items-center p-2">
            <h1 className="px-4 py-1 text-center">{name || "Bicep Curl" } <span> option</span></h1>
                <OpenInFullIcon />
            </div>
            {sets.value.map((set, index) => 
            <Set editMode={false} key={index} setType={set.setTypeValue} weight={set.weightValue} units={set.weightUnits} reps={set.repsValue} RepType={set.repType} />)}
            <Set editMode />
            {/* <Rest duration={30}/> */}
            <div className='flex justify-between text-center p-2'>
                {/* <button className='button ' onClick={'addSet'} >Add Set</button > */}
                <button className='button ' onClick={addRest}>Add Rest</button>
            </div>
            {KeyboardVisibility.value = true ? <Keyboard /> : <></>}

        </div>
    )
}
export default ExerciseSection




export function Rest(props) {
    return <p>{props.duration}s Rest</p>
}