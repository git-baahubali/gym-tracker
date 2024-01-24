// import { useState, useEffect } from 'react'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Keyboard from './Keyboard';
import { KeyboardVisibility } from './Keyboard';
import db from '../../db.js';
import { signal } from '@preact/signals-react';
import Set from './Set.jsx';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';

export const sets = signal([])

function ExerciseSection({ name }) {
    const [keyboardInput, setKeyboardInput] = useState('');
    console.log('Keyboard Input:', keyboardInput);
    const handleKeyboardInputChange = (newValue) => {
        setKeyboardInput(prev => prev+newValue);
    };

    async function addRest() {

    }
    
    useEffect(() => {
    }, [keyboardInput])
    return (
        <div className='w-[90vw] border-0 bg-sky-900 rounded-xl m-2 '>
            <div className="flex justify-between items-center p-2">
                <h1 className="px-4 py-1 text-center text-gray-200">{name || "Bicep Curl"} <span> </span></h1>
                <OpenInFullIcon />
            </div>
            {sets.value.map((set, index) =>
                <Set editMode={false} key={index} setType={set.setTypeValue} weight={set.weightValue} units={set.weightUnits} reps={set.repsValue} RepType={set.repType} />)}
            <Set editMode />

            {/* <Rest duration={30}/> */}
            <div className='flex justify-between text-center p-2'>
                {/* <button className='button ' onClick={'addSet'} >Add Set</button > */}
                <button className='button ' onClick={addRest}>Add Rest</button>
                <Button onClick={() => { KeyboardVisibility.value = !KeyboardVisibility.value }} className='font-thin text-xs py-1'>Autofill Keyboard</Button>
            </div>
            {KeyboardVisibility.value ? <Keyboard exerciseName={name} keyboardInput={keyboardInput} handleKeyboardInputChange={handleKeyboardInputChange} setKeyboardInput={setKeyboardInput} /> : <></>}

        </div>
    )
}
export default ExerciseSection




export function Rest(props) {
    return <p>{props.duration}s Rest</p>
}