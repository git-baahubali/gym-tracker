
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage'; 
import WorkoutPage from './pages/WorkoutPage';
import Keyboard from './components/Keyboard';
import RoutinesPage from './pages/RoutinesPage';
import Routine from './pages/Routine';
import Exercisesdb from './pages/Exercisesdb';

import { signal, computed, effect } from "@preact/signals-react";

const Number = signal(0)
function App() {


  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<RoutinesPage />} />
        <Route path="/Routine/:routineId" element={<Routine />} />
        <Route path="/WorkoutPage" element={<WorkoutPage />} />
        {/* <Route path="/HomePage" element={<HomePage />} /> */}
        <Route path="/Exercisesdb" element={<Exercisesdb /> } />
        <Route path="/Keyboard" element={<Keyboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
