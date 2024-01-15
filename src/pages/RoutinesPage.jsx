import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { addRoutine } from "../../db";
import db from "../../db";
import History from "../components/History";

function RoutinesPage() {
    const [Routines, setRoutines] = useState([{ name: 'Loading Routines' }])
    const [name, setName] = useState('')
    async function handleSubmit(e) {
        e.preventDefault();

        // const id = await db.routines.add({name:name});
        const id = await addRoutine(name);
        const lastRoutine = await db.routines.where("id").equals(id)
        if (id) {
            setRoutines(prev => [...prev, lastRoutine])
        }
    }

    useEffect(() => {
        (async () => {
            const temp = await db.routines.toArray()
            setRoutines(temp)
        })()
    }, [])
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold py-2">Routines</h1>
            <div className="grid grid-cols-2 gap-5">
            {Routines.map((x, index) => <Link key={index} to={'/Routine/'+ x.id}> <RoutineCard name={x.name} id={x.id} /></Link>)}
            </div>
            <History/>

            <form onSubmit={handleSubmit} className="fixed bottom-5 ">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="my-2  border-2 border-gray-600 p-2"/>
                <button type="submit" className="my-2  border-2 border-gray-600 p-2">Add Routine</button>
            </form>
        </div>
    )
}

export default RoutinesPage



function RoutineCard({ id,name }) {
    async function handleDelete(){
        await db.routines.delete(id)
    }
    return (
        <div className="relative w-[40vw] h-16 flex items-center justify-center p-2 my-2 m-auto  border-gray-600 border-[1px]"> {name}
        <span className="absolute left-[35vw] top-[-0.5rem] text-xl flex justify-center items-center px-2 rounded-full"  onClick={handleDelete}>x</span></div>
    )
}