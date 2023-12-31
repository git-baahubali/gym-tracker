import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseSection from "../components/ExerciseSection";
import db from "../../db";
import Set from "../components/Set";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function Routine() {
	console.log("render");
	const { routineId } = useParams();
	const [exerciseList, setExerciseList] = useState([]);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [excercises, setExcercises] = useState([
		"Push-Up",
		"Pull-Up",
		"Squat",
		"Deadlift",
		"Bench Press",
		"Barbell Row",
		"Overhead Press",
		"Barbell Curl",
		"Tricep Dips",
		"Plank",
		"Lunges",
		"Lat Pulldown",
		"Leg Press",
		"Romanian Deadlift",
		"Face Pull",
		"Hammer Curl",
		"Cable Crunch",
		"Seated Calf Raise",
		"Bent Over Row",
		"Front Squat",
		"Box Jump",
		"Russian Twist",
		"Leg Extension",
		"Calf Raises",
		"Dumbbell Fly",
		"Reverse Crunch",
		"Side Plank",
		"Dumbbell Step-Up",
		"Incline Dumbbell Press",
		"Reverse Lunges",
		"Barbell Shrug",
		"Hanging Leg Raise",
		"Dumbbell Shoulder Press",
		"Bicep Hammer Curl",
		"Tricep Kickback",
		"Side Lateral Raise",
		"Mountain Climbers",
		"Decline Bench Press",
		"Seated Leg Curl",
		"Preacher Curl",
		"Skull Crushers",
		"Hip Thrust",
		"Oblique Crunch",
		"Cable Row",
		"Good Morning",
		"Calf Press on the Leg Press Machine",
		"Dumbbell Pullover",
		"Cable Woodchop",
		"Smith Machine Squat",
		"Arnold Press",
		"Leg Curl",
		"Hyperextension",
		"Incline Leg Press",
		"Dumbbell Scaption",
		"Reverse Fly",
		"Dumbbell Kickback",
		"Seated Military Press",
		"Concentration Curl",
		"Seated Cable Row",
		"Dumbbell Farmer's Walk",
		"Plank to Push-Up",
		"Leg Curl Machine",
		"Machine Fly",
		"Barbell Lunge",
		"Lateral Box Jump",
		"Dumbbell Goblet Squat",
		"Chest Supported Row",
		"Front Plate Raise",
		"Leg Raise on Parallel Bars",
		"Cable Bicep Curl",
		"Reverse Grip Tricep Pushdown",
		"Face Pull with Rope Attachment",
		"Smith Machine Bent Over Row",
		"Dumbbell Box Step-Up",
		"Kettlebell Swing",
		"Lying Leg Curl",
		"Medicine Ball Slam",
		"Seated Dumbbell Curl",
		"T-Bar Row",
		"Inverted Row",
		"Barbell Wrist Curl",
		"Dumbbell Wrist Curl",
		"Seated Leg Press",
		"Dumbbell Tricep Extension",
		"Reverse Hyperextension",
		"Pallof Press",
		"Cable Curl",
		"Single-Leg Press",
		"Close-Grip Lat Pulldown",
		"Machine Lateral Raise",
		"Cable Hammer Curl",
		"Tricep Rope Pushdown",
		"Decline Push-Up",
		"Single-Arm Dumbbell Row",
		"Incline Reverse Crunch",
		"Landmine Press",
		"Standing Calf Raise",
		"Seated Military Press Machine",
	]);
	const [filteredExercises, setFilteredExcercises] = useState([]);

	useEffect(() => {
		// fetch routine name & exercise list from routines table
		db.routines.get(routineId).then((data) => {
			console.log(data);
			setExerciseList(data);
		});

		//update the exerciseList
	}, []);

	// Effect for search
	useEffect(() => {
		const filtered = excercises.filter((exercise) =>
			exercise.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredExcercises(filtered);
	}, [excercises, searchQuery]);

	const handleDrawer = () => {
		isDrawerOpen ? setIsDrawerOpen(false) : setIsDrawerOpen(true);
	};
	return (
		<div>
			<p>Routine - {routineId}</p>
			{/* <Set/> */}
			<div className='w-full h-10 border'>Set box</div>
			{/* {exerciseList.map(x => <ExerciseSection editMode={false}/>)} */}
			<Drawer>
				<DrawerTrigger size='sm' variant='default'>
					<div className='p-2 rounded-lg text-white bg-slate-500'>
						Add Exercise
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className='flex justify-center'>
						<DrawerHeader className='w-[50%] '>
							{/* <DrawerTitle>Are you sure absolutely sure?</DrawerTitle> */}
							<DrawerClose onClick={() => setSearchQuery("")}>X</DrawerClose>
							<Input
								placeholder='Search'
								type='text'
								name='search'
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							{/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
							<ScrollArea className='h-72 rounded-md border'>
								<div>
									{filteredExercises.length === 0 ? (
										<div>
											<p>Add {`"${searchQuery}"`} excercise to your list ?</p>
											<Button
												onClick={() =>
													setExcercises((allExercises) => [
														...allExercises,
														searchQuery,
													])
												}
											>
												+ Add
											</Button>
										</div>
									) : (
										filteredExercises.map((excercise) => (
											<div key={excercise}>
												<div>{excercise}</div>
												<Separator />
											</div>
										))
									)}
								</div>
							</ScrollArea>
						</DrawerHeader>
					</div>
					<DrawerFooter>{/* <DrawerClose>cancel</DrawerClose> */}</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

export default Routine;
