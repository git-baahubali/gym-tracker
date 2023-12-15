import React, { useState } from 'react'

function ExerciseSection() {
    return (
        <div className='border-2 bg-sky-900 rounded-xl m-0'>
            <div className="flex justify-between items-center"><h1 className="px-4 py-1">Exercise Name</h1> <button className='px-4 py-1'>expand</button></div>
            <Set />
        </div>
    )
}

export default ExerciseSection

function Set() {
    const [setType, setSetType] = useState("Full Range")
    return (
        <div className='flex '>
            <p>1</p>
            <p>warm up / main set /  sub set / drop set</p>

            <input type="text" />
            <div className="suggestions"></div>
            <select value={setType} onChange={(e) => setSetType(e.target.value)} className="p-1">
                <option value="Full Range">FR</option>
                <option value="Partial Range">PR</option>
                <option value="Negatives">Negatives</option>
                <option value="Holds">Holds</option>
                {/* Add more options here if needed */}
            </select>
        </div>
    )
}