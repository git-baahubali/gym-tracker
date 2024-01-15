import { useForm, Controller } from 'react-hook-form';
import { Button } from './ui/button';


const defaultCheckedIds = []; // Squat will be checked by default

function ExerciseForm({filteredList}) {
console.log("filtered: ",filteredList.value);
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      exercises: [...filteredList.value].reduce((acc, curr) => {
        acc[curr.id] = defaultCheckedIds.includes(curr.id);
        return acc;
      }, {}),
    }
  });

  const onSubmit = (data) => {
    const selectedExercises = Object.entries(data.exercises)
      .filter(([id, checked]) => checked)
      .map(([id]) => id);

    if (selectedExercises.length === 0) {
      alert('Please select at least one exercise.');
    } else {
      console.log('Selected Exercise IDs:', selectedExercises);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Select Your Exercises</legend>
        {filteredList.value.map((exercise) => (
          <div key={exercise.id}>
            <Controller
              name={`exercises.${exercise.id}`}
              control={control}
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  {exercise.name}
                </label>
              )}
            />
          </div>
        ))}
        {errors.exercises && <p>Please select at least one exercise.</p>}
      </fieldset>
      <Button type="submit" >Submit</Button>
    </form>
  );
}

export default ExerciseForm;


