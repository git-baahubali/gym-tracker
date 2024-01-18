import React, { useState, useEffect } from 'react'
import { signal } from '@preact/signals-react'
import db from '../../db';
import CheckboxReactHookFormMultiple from '@/components/Xyz';
import { Button } from "@/components/ui/button"


export const allExercises = signal([]);
function Exercisesdb() {
    const [Name, setName] = useState('')
    console.log("render allExercises", allExercises.value);

    function validateName(name) {
        //rules for validation
        // code for validation 
        return true / false
    }
    async function fetchAllExercises() {
        try {
            db.exercises.toArray().then((response) => {
                allExercises.value = response
            })
        } catch (error) {
            console.log("error occured at fetchAllExercises in db.js .", error);
        }
    }

    async function handleAddExercise(e) {
        e.preventDefault();
        // update state
        const Name = e.target.elements[0].value
        const TempNames = Name.split(',')
        // if (validateName("name"))
        // allExercises.value= [...allExercises.value, ...TempNames]
        //will add each word into db
        TempNames.map(x => (async () => { await db.exercises.add({ name: x }) })()
        )
        fetchAllExercises();
    }
    async function handleDelete(id) {
        await db.exercises.delete(id);
        fetchAllExercises()
    }
    useEffect(() => {
        fetchAllExercises();
    }, [])

    return (
        <div>
            <h1>List of exercises</h1>
            <div className='grid grid-cols-2 gap-2'>
                {allExercises.value.map((exercise, index) =>
                    <p className='text-left'
                    key={index}>{exercise.name} 
                    <Button className='scale-50'
                    variant='destructive' onClick={() => { handleDelete(exercise.id) }}>delete</Button></p>)}
            </div>

            <form action="" onSubmit={(e) => { handleAddExercise(e) }}>
                <input type="text" placeholder='add new exercise' />
                <button className='px-2 mx-2' >add</button>
            </form>

            <p> <span className='font-bold'>Tip: </span>
                comma seperated values like 'bicep,tricep,chest' will add 3 'bicep','tricep', 'chest'</p>



        </div>
    )
}

export default Exercisesdb


