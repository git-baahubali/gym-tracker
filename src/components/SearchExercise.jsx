//! SearchExercise lets user search a exercise and add exercise to today's list of exercises 
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useLiveQuery } from "dexie-react-hooks"
import db from "../../db";


export function SearchExercise(props) {
  const allExercises = useLiveQuery(() => db.exercises.toArray(), []);
  //  Routine is a record in db in the form of 
//   {
//     "name": "Pull Day",
//     "exercises": [
//         1,
//         2
//     ],
//     "id": 6
// }

// Use useLiveQuery to fetch the routine and reactively update the component when changes occur in the routine.exercises array in the IndexedDB.
  const routine = useLiveQuery(() => db.routines.get(props.routineId),[])
  function addExerciseToday(exerciseObject) {
    console.log(exerciseObject);
    // exerciseObject is in the below form
    // {
    //     "id": 1,
    //     "name": "Bench Press",
    //     "category": "Chest"
    // }
    // Check if exercise already exists in the Day ?
    //    if not present add it  
  }
//Handle Checkbox Changes and Update IndexedDB
  async function handleCheckBox(exerciseId, isChecked) {
    if (routine) {
      const newExercises = isChecked
        ? [...routine.exercises, exerciseId] // Add exerciseId
        : routine.exercises.filter(id => id !== exerciseId); // Remove exerciseId
  
      await db.routines.update(routine.id, { exercises: newExercises });
    }
  }

  return (
    <Command className="rounded-lg border shadow-md top-0">
      <CommandInput placeholder="Search exercise" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {allExercises?.map((x, index) => 
          <CommandItem key={index} >

            <input 
            checked= {routine.exercises.includes(x.id)}
            onChange={(e) => handleCheckBox(x.id, e.target.checked)}
            type="checkbox" name={x.name} id={x.id} /><span onClick={() => addExerciseToday(x)}>{x.name}</span>
          </CommandItem>)}
          <CommandItem>
            {/* <Calendar className="mr-2 h-4 w-4" /> */}
            <input type="checkbox" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}


export default SearchExercise