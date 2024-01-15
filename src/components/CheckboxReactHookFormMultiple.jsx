import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom"
import ChildComponent from "./ChildComponent";
import db from "../../db";

async function updateExercisesInRoutine(arrayOfExercises,routineId){
  await db.routines.put({id:routineId, exerciseId:arrayOfExercises})
}
const FormSchema = z.object({
  items: z.array(z.number()).nonempty("You have to select at least one item."),
});

// eslint-disable-next-line react/prop-types
function CheckboxReactHookFormMultiple( {filteredList,existingExercises}) {
  const { routineId } = useParams();
console.log("for rendered");
const ref = useRef('null')

useEffect(()=>{
  // console.log(ref);
},[ref])

  const items = filteredList;
  const form = useForm({
   resolver: zodResolver(FormSchema),
    defaultValues: {
      items: existingExercises.map(x => x.id),
    },
  });

 
  function onSubmit(data) {
    console.log('Selected Exercise IDs:', data.items);// not printing

    // update Exercises In Routine
    updateExercisesInRoutine(data.items,routineId)


    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

  }



  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">All Exercises</FormLabel>
                <FormDescription>
                  Select the exercises you want in this Routine.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox 
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal" >
                          {item.name}
                        </FormLabel>
                            <ChildComponent ref={ref} name={item.id}/>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Submit</Button>
      </form>
    </Form>
  );
}

export default CheckboxReactHookFormMultiple;


