import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addRoutine } from "../../db";
import db from "../../db";
import History from "../components/History";
import { ScrollArea } from "../components/ui/scroll-area";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";

function RoutinesPage() {
	const [Routines, setRoutines] = useState([{ name: "Loading Routines" }]);
	const [name, setName] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();

		// const id = await db.routines.add({name:name});
		const id = await addRoutine(name);
		const lastRoutine = await db.routines.where("id").equals(id);
		if (id) {
			setRoutines((prev) => [...prev, lastRoutine]);
		}
	}

	useEffect(() => {
		(async () => {
			const temp = await db.routines.toArray();
			setRoutines(temp);
		})();
	}, []);

	const calendar = [
		"rest",
		"pull Day ",
		"push day",
		"leg day",
		"pull Day ",
		"push day",
		"leg day",
	];

	const handleEdit = () => {
		setIsEditing((value) => !value);
		console.log(isEditing);
	};
	return (
		<div className='p-2'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Sun</TableHead>
						<TableHead>Mon</TableHead>
						<TableHead>Tue</TableHead>
						<TableHead>Wed</TableHead>
						<TableHead>Thu</TableHead>
						<TableHead>Fri</TableHead>
						<TableHead>Sat</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						{calendar.map((day) => (
							<TableCell key={day} className='text-left'>
								{day}
							</TableCell>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
						))}

						<TableCell>
							<div onClick={handleEdit}>
								<EditIcon />
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<h1 className='text-2xl font-bold py-2'>Routines</h1>
			<ScrollArea className='h-96 w-full p-4 rounded-md border'>
				<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
					{Routines.map((x, index) => (
						<Link key={index} to={"/Routine/" + x.id}>
							<RoutineCard name={x.name} id={x.id} />
						</Link>
					))}
				</div>
			</ScrollArea>

			<History />

			<form onSubmit={handleSubmit} className='fixed bottom-5 '>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='my-2  border-2 border-gray-600 p-2'
				/>
				<button type='submit' className='my-2  border-2 border-gray-600 p-2'>
					Add Routine
				</button>
			</form>
		</div>
	);
}

export default RoutinesPage;

function RoutineCard({ id, name }) {
	async function handleDelete(e) {
		e.preventDefault();
		await db.routines.delete(id);
	}
	return (
		<div className='max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300'>
			<div className='flex justify-end px-6 py-4'>
				<button
					className='text-red-500 hover:text-red-700 text-xl font-bold cursor-pointer'
					onClick={handleDelete}
				>
					x
				</button>
			</div>
			<div className='pb-4'>
				<div className='text-xl font-bold mb-2'>{name}</div>
			</div>
		</div>
	);
}
