// import { useState, useEffect } from 'react'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Keyboard from './Keyboard';
import Keyboard2 from './Keyboard2';
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
        setKeyboardInput(prev => prev + newValue);
    };

    async function addRest() {

    }
    function parseExerciseStrings0(strings) {
        const result = [];
        let lastWeight = null;
        let lastWeightUnit = null;
    
        strings.forEach((str, index) => {
            // Regular expression to extract components from the string
            const pattern = /^(\d+)?(Kg|lbs)?\*(\d+)(FR|PR|N)$/;
            const match = str.match(pattern);
    
            if (match) {
                let [_, weight, weightUnit, reps, repType] = match;
    
                // Use the last weight and weight unit if they are not specified in the current string
                weight = weight !== undefined ? parseInt(weight) : lastWeight;
                weightUnit = weightUnit !== undefined ? weightUnit : lastWeightUnit;
    
                // Determine setType based on weight change (Drop set if weight decreased)
                const setType = index > 0 && weight < lastWeight ? 'D' : 'M';
    
                // Create and add the object to the result array
                result.push({ setType, weight, weightUnit, reps: parseInt(reps), repType });
    
                // Update lastWeight and lastWeightUnit for the next iteration
                lastWeight = weight;
                lastWeightUnit = weightUnit;
            } else {
                console.error(`String did not match the expected format: ${str}`);
            }
        });
    
        return result;
    }
    function parseExerciseStrings1(strings) {
        const result = [];
        let lastWeight = null;
        let lastWeightUnit = null;
    
        strings.forEach((str, index) => {
            // Regular expression to extract components from the string
            // The weight and weightUnit parts are optional in the regex
            const pattern = /(\d+)?(Kg|lbs)?\*(\d+)(FR|PR|N)/;
            const match = str.match(pattern);
    
            if (match) {
                let [_, weight, weightUnit, reps, repType] = match;
    
                // Use the last weight and weight unit if they are not specified in the current string
                weight = weight ? parseInt(weight) : lastWeight;
                weightUnit = weightUnit ? weightUnit : lastWeightUnit;
    
                // Determine setType based on weight change (Drop set if weight decreased)
                const setType = index > 0 && weight < lastWeight ? 'D' : 'M';
    
                // Create and add the object to the result array
                result.push({ setType, weight, weightUnit, reps: parseInt(reps), repType });
    
                // Update lastWeight and lastWeightUnit for the next iteration, but only if they're present in the current string
                if (weight) {
                    lastWeight = weight;
                    lastWeightUnit = weightUnit;
                }
            } else {
                console.error(`String did not match the expected format: ${str}`);
            }
        });
    
        return result;
    }
    function parseExerciseStrings(strings) {
        const result = [];
        let lastWeight = null;
        let lastWeightUnit = null;
    
        strings.forEach((str, index) => {
            let setType = 'M';
            let weight, weightUnit, reps, repType;
    
            if (index === 0 || str.match(/^\d+(Kg|lbs)\*/)) {
                // Regular expression for full format (including weight)
                const fullPattern = /(\d+)(Kg|lbs)\*(\d+)(FR|PR|N|Sec)/;
                const match = str.match(fullPattern);
    
                if (match) {
                    [, weight, weightUnit, reps, repType] = match.map(m => isNaN(m) ? m : parseInt(m));
                    lastWeight = weight;
                    lastWeightUnit = weightUnit;
                }
            } else {
                // Handle subsequent strings without weight
                const partialPattern = /(\d+)(FR|PR|N|Sec)/;
                const match = str.match(partialPattern);
    
                if (match) {
                    [, reps, repType] = match.map(m => isNaN(m) ? m : parseInt(m));
                    weight = lastWeight;
                    weightUnit = lastWeightUnit;
    
                    // Check for drop set
                    setType = 'D';
                }
            }
    
            if (weight && weightUnit && reps && repType) {
                result.push({ setType, weight, weightUnit, reps, repType });
            } else {
                console.error(`String did not match the expected format: ${str}`);
            }
        });
    
        return result;
    }
    
    // const inputStrings = ['12Kg*12FR', '10Kg*12FR', '10PR', ''];
   
    
    // function magic(sets) {
    //     console.log(sets);
    //     // sets = [ ['12Kg', '12FR'],['12lbs', '12FR'],['10FR'],['']]
    //     // convert to [{setType: 'M', weight: 12,weightUnit:'Kg', reps: 12 , repType:'FR'},{setType: 'D',weight: 12,weightUnit:'lbs', reps: 12 , repType:'FR'},{setType: 'M',weight: 12,weightUnit:'lbs', reps: 10 , repType:'PR'} ]

    //     //feature - 1 : if no weight is mentioned it takes the previous weight
    //     //feature - 2 : 
    //     const arrayOfSets = sets.reduce((acc, set, index, arr) => {
    //         // set = ['12Kg', '12FR'] or set = ['10PR']

    //         const obj = {
    //             weightType: 'M',
    //             weight: null,
    //             weightUnits: 'Kg',
    //             reps: null,
    //             repType: 'FR'
    //         }
    //         console.log('set: ', set);

    //         if (set[0].includes('Kg')) {
    //             obj.weight = parseFloat(set[0].split('Kg')[0])
    //             set[1].split()
    //         }
    //         else if (set[0].includes('lbs')) {
    //             obj.weight = set[0].split('lbs')[0]
    //             obj.weightUnits = 'lbs'
    //         }

    //         else if (index > 0 && ["FR", 'PR', 'N', ''].some(subString => set.includes(subString)))
    //         // {weight = arr[index-1].weight }
    //         {/* check  arr*/ }
    //         console.log("obj:", obj);
    //     }, [])

    // }

    useEffect(() => {
        //!  Say keyboardInput is 12Kg*12FR,10lbs*12FR,10PR,
        const setStrings = keyboardInput.split(',')
        // setStrings = ['12Kg*12FR','10Kg*12FR','10PR', '']
        console.log(setStrings);
        const sets = setStrings.map(setString => setString.split('*'))
        // console.log(sets);

        //* convert to [{weight: 12,weightUnit:'Kg', reps: 12 , repType:'FR'},{weight: 12,weightUnit:'lbs', reps: 12 , repType:'FR'},{weight: 12,weightUnit:'lbs', reps: 10 , repType:'PR'} ]
        //feature - 1 : if no weight is mentioned it takes the previous weight
        //feature - 2 : 
    
        const parsedData = parseExerciseStrings(setStrings);
        console.log("parsedData:",parsedData);
        
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
            {/* {KeyboardVisibility.value ? <Keyboard exerciseName={name} keyboardInput={keyboardInput} handleKeyboardInputChange={handleKeyboardInputChange} setKeyboardInput={setKeyboardInput} /> : <></>} */}
            {KeyboardVisibility.value ? <Keyboard2 exerciseName={name} keyboardInput={keyboardInput} setKeyboardInput={setKeyboardInput} handleKeyboardInputChange={handleKeyboardInputChange} /> : <></>}

        </div>
    )
}
export default ExerciseSection

export function Rest(props) {
    return <p>{props.duration}s Rest</p>
}


