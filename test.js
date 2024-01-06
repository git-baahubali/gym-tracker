// test.js

// const temp = {
//     'setType': "Main",
//     'weight': 12,
//     'weightUnits': "Kg",
//     'reps': 8,
//     'repType': "FR"
//   }

//   console.log(temp);

//   const temp2 = {...temp , ['repType']:"PR"}

//   console.log(temp2);

const filteredList = [
    {
        "name": "bicep",
        "id": 19
    },
    {
        "name": "squat",
        "id": 20
    },
    {
        "name": "Flat bench press",
        "id": 27
    },
    {
        "name": " Incline bench press",
        "id": 28
    }
]
const defaultCheckedIds = [20,19]; // Squat will be checked by default

const exercise = filteredList.reduce((acc, curr) => {
    acc[curr.id] = defaultCheckedIds.includes(curr.id);
    return acc;
  }, {})

  console.log(exercise);