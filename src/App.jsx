import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkoutPage from './pages/WorkoutPage';
import Keyboard from './components/Keyboard';
import RoutinesPage from './pages/RoutinesPage';
import { signal, computed, effect } from "@preact/signals-react";

const Number = signal(0)
function App() {


  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<RoutinesPage />} />
        <Route path="/WorkoutPage" element={<WorkoutPage />} />
        <Route path="/Keyboard" element={<Keyboard />} />
        <Route path="/RoutinesPage" element={<RoutinesPage />} />

        <Route path="/workout/:routineId" element={<WorkoutPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
