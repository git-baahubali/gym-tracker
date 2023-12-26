
import { NavLink } from 'react-router-dom'

function Homepage() {
    return (
        <>
            <h1 className="grid grid-cols-2"> Routines</h1>
            <NavLink to={'/WorkoutPage'}><article className=''> Routine 1 </article></NavLink>
            <NavLink><article className=''> Routine 1 </article></NavLink>
       
        </>

    )
}

export default Homepage