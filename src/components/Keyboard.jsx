import { signal } from "@preact/signals-react";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Switch } from "@/components/ui/switch"
import { useState } from "react";


export const KeyboardVisibility = signal(false);
export const setKeyboardInput = signal('');

function handleClose() {
    KeyboardVisibility.value = false
}

function Keyboard({ name, keyboardInput, setKeyboardInput, handleKeyboardInputChange }) {

    const [lastInputType, setLastInputType] = useState(null); // New state to track the last input type
    const [isProMode, setIsProMode] = useState(true); // New state for Pro mode
    function toggleProMode() {
        setIsProMode(!isProMode); // Toggle the state
    }

  

      // function onKey(key) {
    //     const keyInfo = mapOfKeys.get(key);
    //     if (keyInfo) {
    //         setKeyboardInput.value += keyInfo.stringToAdd;
    //     }
    // }
    function onKey(key) {
        // Determine whether the key should be allowed based on the current input and the key pressed
        if (allowKey(keyboardInput, key)) {
            const keyInfo = mapOfKeys.get(key);
            if (keyInfo) {
                const newValue = keyboardInput + keyInfo.stringToAdd;
                setKeyboardInput(newValue); // Update the local state with the new value
                setLastInputType(determineInputType(key)); // Update last input type
            
            }
        } else {
            // Optionally, handle the case where the key is not allowed (e.g., show an error, ignore the key press, etc.)
            console.log(`Key "${key}" is not allowed after "${keyboardInput}"`);
        }
    }
    
    const allowKey = (keyboardInput, key) => {
        const keyboardInputType = determineInputType(key);
        console.log("keyboardInputType: ",keyboardInputType,"lastInputType: ", lastInputType);

        // Allow the first input to be a number (weight)
        if (lastInputType === null && keyboardInputType === 'number') {
            return true;
        }
        //Disallow if first typed is not a number 

        // If the last input was a weight unit and current input is not a number, disallow
        if (lastInputType === 'weightUnit' && keyboardInputType !== 'number') {
            return false;
        }

        // If the last input was a number and current input is not a weight unit or exercise type, disallow
        if (lastInputType === 'number' && !['weightUnit', 'repType'].includes(keyboardInputType)) {
            return false;
        }

        // Other checks can be added here based on further rules

        return true; // If none of the above conditions met, allow the key
    };

    const determineInputType = (key) => {
        // '1' or 'Kg*' or 'FR' or 'Others'
        console.log("key:",!isNaN(key));
        if (!isNaN(key)) return 'number'; // If the key is a number
        if (['Kg', 'lbs'].includes(key)) return 'weightUnit'; // If the key is a weight unit
        if (['FR', 'PR', 'N', 'Sec'].includes(key)) return 'repType'; // If the key is an exercise type
        return 'other'; // For other keys (e.g., '.', 'Clear')
    };

  


    function handleExpressionChange(e) {
        // setKeyboardInput.value = e.target.value;
        setKeyboardInput(e.target.value)
    }

    function handleAutoFill(params) {
        //
    }
    // Define keys for both modes
    const proKeys = ['1', '2', '3', 'FR', '4', '5', '6', 'PR', '7', '8', '9', 'N', 'lbs', '0', 'Kg', 'Sec'];
    const keys = ['1', '2', '3', '', '4', '5', '6', 'N/A', '7', '8', '9', 'Steps', 'lbs', '0', 'Kg', ',']


    const mapOfKeys = new Map([['1', { key: '1', stringToAdd: '1' }],
    ['2', { key: '2', stringToAdd: '2' }],
    ['3', { key: '3', stringToAdd: '3' }],
    ['4', { key: '4', stringToAdd: '4' }],
    ['5', { key: '5', stringToAdd: '5' }],
    ['6', { key: '6', stringToAdd: '6' }],
    ['7', { key: '7', stringToAdd: '7' }],
    ['8', { key: '8', stringToAdd: '8' }],
    ['9', { key: '9', stringToAdd: '9' }],
    ['0', { key: '0', stringToAdd: '0' }],

    ['Kg', { key: 'Kg', stringToAdd: 'Kg*' }],
    ['lbs', { key: 'lbs', stringToAdd: 'lbs*' }],
    ['FR', { key: 'FR', stringToAdd: 'FR,' }],
    ['PR', { key: 'PR', stringToAdd: 'PR,' }],
    ['N', { key: 'N', stringToAdd: 'N,' }],
    ['Sec', { key: 'Sec', stringToAdd: 'Sec,' }],
    [',', { key: ',', stringToAdd: ',' }],
    ['Steps', { key: 'Steps', stringToAdd: 'Steps,' }]
    ])
    return (
        <div className={`fixed bottom-0 left-0 z-10 bg-gray-900 grid grid-cols-4 w-full h-[300px] gap-2 text-white ${KeyboardVisibility ? '' : 'hidden'}`}>
            <input type="text" readOnly
                value={keyboardInput}
                onChange={handleExpressionChange} className="col-span-3 border-2 border-sky-900 p-2 expression text-black" />
            {/* read only prevents device keyboard from popping up  */}
            <button className="button bg-gray-500  flex justify-around items-center" >
                {/* <KeyboardIcon /> */}
                <span>pro</span><Switch checked={isProMode} onClick={toggleProMode} />
            </button>
            {/* <p className="col-span-4 border-2 border-sky-900 p-2 expression">{setKeyboardInput.value}</p> */}
            <button className='button border-[1px] border-gray-600 active:bg-black'
                onClick={handleClose}> Close</button>
            <button className='button border-[1px] border-gray-600 active:bg-black'
                onClick={() => setKeyboardInput.value += '.'}> .</button>
            <button className="border-[1px] border-red-900 active:bg-black"
                onClick={() => { setKeyboardInput('') }}>Clear</button>
            <button className='button border-[1px] border-sky-600 active:bg-black'
                onClick={handleAutoFill} > Autofill </button>

            {isProMode ?
                proKeys.map(key => (
                    <button key={key} onClick={() => onKey(key)}
                        className='button border-[1px] border-gray-600 active:bg-black'
                    >{key}</button>
                ))
                :
                keys.map(key => (
                    <button key={key} onClick={() => onKey(key)}
                        className='button border-[1px] border-gray-600 active:bg-black'
                    >{key}</button>
                ))
            }
        </div>
    )
}

export default Keyboard


