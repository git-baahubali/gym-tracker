
import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage'; 
import WorkoutPage from './pages/WorkoutPage';
import Keyboard from './components/Keyboard';
import Home from './pages/Home';
import Routine from './pages/Routine';
import Exercisesdb from './pages/Exercisesdb';
import Competition from './pages/Competition';
import PoseTest from './pages/PoseTest';
import Day from './pages/Day';
import { initializeExercises } from '../db';


function App() {

  useEffect(() => {
    initializeExercises();
  }, []);
  

  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Routine/:routineId" element={<Routine />} /> */}
        <Route path="/day/:date" element={<Day />} />
        <Route path="/WorkoutPage" element={<WorkoutPage />} />
        {/* <Route path="/HomePage" element={<HomePage />} /> */}
        <Route path="/Exercisesdb" element={<Exercisesdb /> } />
        <Route path="/Keyboard" element={<Keyboard />} />
        <Route path="/Pose" element={<PoseTest />} />
        <Route path="/Competition" element={<Competition />} />

        

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


