import { signal, effect, computed } from '@preact/signals-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import CheckboxReactHookFormMultiple from "@/components/CheckboxReactHookFormMultiple";
import db from '../../db.js';


const searchQuery = signal('');
// searcgQuery is also used for new exercise name populated underneath it 
function handleSearch(e) {
    searchQuery.value = e.target.value;

}
export const AllExercisesFromdb = signal([{ id: 6, name: 'Bicep curl' }, { id: 7, name: 'Push Up' }])
const filteredListOfExercises = computed(() => AllExercisesFromdb.value.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase())
))

effect(() => {
    db.exercises.toArray().then(list => {
        AllExercisesFromdb.value = [...list];
        console.log(AllExercisesFromdb.value);

    })
})
function ExerciseSelectionDrawer() {
    return (
        <div>
            <Drawer>
                <Button> <DrawerTrigger>Add exercise to Routine</DrawerTrigger></Button>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Tick exercises from the List</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>

                    <input type="text" placeholder='Search' onChange={handleSearch} />
                    {searchQuery.value ? <p>{'add \'' + searchQuery.value + '\' to routine'}</p> : ''}
                    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                        <CheckboxReactHookFormMultiple filteredList={filteredListOfExercises.value} />
                    </ScrollArea>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer></div>
    )
}

export default ExerciseSelectionDrawer




