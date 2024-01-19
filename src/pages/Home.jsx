import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addRoutinetoDB } from "../../db";
import db from "../../db";
import History from "../components/History";
import { useLiveQuery } from "dexie-react-hooks";

import RoutineComponent from "@/components/RoutineComponent";


//Story of Home page.
// Home page consists of routines & history
//When a routine is clicked, navigate to the Day component and pass the routine ID as a parameter. You can use useNavigate from react-router-dom for navigation.


//Code starts here
function Home() {
    const Routines = useLiveQuery(() => db.routines.toArray(), [])
    // const [Routines, setRoutines] = useState([{ name: 'Loading Routines' }])
    const [name, setName] = useState('')

    const navigate = useNavigate()
    function handleRoutineClick(routineId, routineName) {
        navigate(`/day/${new Date().toISOString().split('T')[0]}`, { state: { routineId, routineName } });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.trim() !== '') {
            const id = await addRoutinetoDB(name, []);
            setName(''); // Reset input field after adding
        }
    }
    async function handleDelete(id) {
        await db.routines.delete(id)
    }

    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold py-2">Home</h1>
            <h4>Select a routine to start working out</h4>
            <div className="grid grid-cols-2 gap-2">
                {/* {Routines.map((x, index) => <Link key={index} to={'/Routine/'+ x.id}> <RoutineCard name={x.name} id={x.id} /></Link>)} */}
                {Routines && Routines.map((routine, index) =>
                    <RoutineComponent key={index} name={routine.name} id={routine.id}
                    handleRoutineClick={() => handleRoutineClick(routine.id, routine.name)}
                        handleDelete={()=>handleDelete(routine.id)}>

                        <span className="relative w-[40vw] h-16 flex items-center justify-center p-2 my-2 m-auto  border-gray-600 border-[1px]"> {routine.name}</span>

                    </RoutineComponent>
                )}
                {/* <RoutineCard name={'Add routine'} /> */}
            </div>
            <History />

            <form onSubmit={handleSubmit} className="fixed bottom-5 ">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="my-2  border-2 border-gray-600 p-2" />
                <button type="submit" className="my-2  border-2 border-gray-600 p-2">Add Routine</button>
            </form>
        </div>
    )
}

export default Home



// function RoutineCard({ id, name }) {

//     return (
//         <div className="relative w-[40vw] h-16 flex items-center justify-center p-2 my-2 m-auto  border-gray-600 border-[1px]"> {name}
//             {/* <span className="absolute left-[35vw] top-[-0.5rem] text-xl flex justify-center items-center px-2 rounded-full" onClick={handleDelete}>x</span> */}</div>
//     )
// }