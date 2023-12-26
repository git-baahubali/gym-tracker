import { signal } from "@preact/signals-react";
import KeyboardIcon from '@mui/icons-material/Keyboard';

export const KeyboardVisibility = signal(false);
export const setData = signal('');

function handleClose() {
    KeyboardVisibility.value = false
}

function Keyboard() {
    function onKey(key) {
        const keyInfo = mapOfKeys.get(key);
        if (keyInfo) {
            setData.value += keyInfo.stringToAdd;
        }
    }
    function handleExpressionChange(e) {
        setData.value = e.target.value;
    }
    const keys = ['1', '2', '3', 'FR', '4', '5', '6', 'PR', '7', '8', '9', 'N', 'lbs', '0', 'Kg', 'Sec'];

    const mapOfKeys = new Map([['1', { key: '1', stringToAdd: '1' }],
    ['2', { key: '1', stringToAdd: '2' }],
    ['3', { key: '1', stringToAdd: '3' }],
    ['4', { key: '1', stringToAdd: '4' }],
    ['5', { key: '1', stringToAdd: '5' }],
    ['6', { key: '1', stringToAdd: '6' }],
    ['7', { key: '1', stringToAdd: '7' }],
    ['8', { key: '1', stringToAdd: '8' }],
    ['9', { key: '1', stringToAdd: '9' }],
    ['0', { key: '1', stringToAdd: '0' }],

    ['Kg', { key: 'Kg', stringToAdd: 'Kg*' }],
    ['lbs', { key: 'lbs', stringToAdd: 'lbs*' }],
    ['FR', { key: 'FR', stringToAdd: 'FR,' }],
    ['PR', { key: 'PR', stringToAdd: 'PR,' }],
    ['Sec', { key: 'Sec', stringToAdd: 'Sec,' }]])
    return (
        <div className={`fixed bottom-0 left-0 z-10 bg-gray-900 grid grid-cols-4 w-full h-[300px] gap-2 ${KeyboardVisibility ? '' : 'hidden'}`}>
            <input type="text"readOnly  className="col-span-3 border-2 border-sky-900 p-2 expression" value={setData.value} onChange={handleExpressionChange} />
            <button className="button"><KeyboardIcon /></button>
            {/* <p className="col-span-4 border-2 border-sky-900 p-2 expression">{setData.value}</p> */}
            <button onClick={handleClose} className='button border-[1px] border-gray-600 active:bg-black'> Close</button>
            <p className="col-span-1"></p>
            <button className="border-[1px] border-red-900 active:bg-black" onClick={() => { setData.value = '' }}>Clear</button>
            <button onClick={''} className='button border-[1px] border-sky-600 active:bg-black'> Autofill </button>

            {keys.map(key => (
                <button key={key} onClick={() => onKey(key)}
                    className='button border-[1px] border-gray-600 active:bg-black'
                >{key}</button>
            ))}
        </div>
    )
}

export default Keyboard


