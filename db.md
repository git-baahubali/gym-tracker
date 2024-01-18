### Database Schema Documentation for Gym Diary App

#### Overview
This documentation provides an overview of the database schema used in the Gym Diary App. The schema is designed to efficiently track and store workout data, including routines, exercises, and individual sets. The structure supports easy data retrieval for day-to-day use and analysis, as well as for potential machine learning applications.

#### Schema Details

1. **Days Collection**
   - **Fields**: `id` (auto-incremented), `date`, `workoutRoutineId`, `exerciseSections`.
   - **Purpose**: Stores data about each workout day, including a reference to the workout routine followed and the exercise sections completed that day.

2. **Routines Collection**
   - **Fields**: `id` (auto-incremented), `name`, `exercises`.
   - **Purpose**: Contains predefined workout routines. Each routine includes a list of exercises.

3. **ExerciseSections Collection**
   - **Fields**: `id` (auto-incremented), `dayId`, `exerciseId`, `sets`.
   - **Purpose**: Represents a collection of sets performed for a specific exercise in a single workout session. Linked to a specific day for easy retrieval.

4. **Sets**
   - **Contained within**: ExerciseSections
   - **Fields**: Individual set details like `reps`, `weight`.
   - **Purpose**: Captures the detailed data of each set within an exercise section, such as the number of repetitions and the weight used.

#### Data Storage Strategy

- **Separate Storage of Days and ExerciseSections**: By storing `Days` and `ExerciseSections` separately, the app can efficiently manage and query data related to specific workout sessions and the exercises within those sessions. This separation enhances data organization and supports more complex queries.
- **ExerciseSections for Detailed Tracking**: Storing individual `ExerciseSections` allows for detailed tracking of each exercise performed, including every set's specifics. This granularity is essential for analyzing workout effectiveness and patterns over time.

#### Querying Sets for Analysis

- **Sets for Analysis**: To perform analysis or train ML models, querying the sets across different exercise sections provides a comprehensive dataset. This can be done by aggregating all sets associated with a specific exercise or across multiple exercises.
- **Query Example**: The function `getAllSetsForExercise(exerciseId)` retrieves all sets for a given exercise. It searches the `ExerciseSections` collection, filtering by `exerciseId`, and aggregates all sets from the matching sections.

#### Conclusion

The database schema is thoughtfully designed to capture and organize detailed workout data. The separation of `Days`, `Routines`, and `ExerciseSections`, along with the inclusion of individual `Sets`, ensures flexibility and depth in data handling. This structure supports not only the day-to-day functionality of the Gym Diary App but also enables comprehensive data analysis and potential future machine learning applications.




