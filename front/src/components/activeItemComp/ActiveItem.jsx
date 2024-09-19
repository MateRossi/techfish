import './ActiveItem.css';

import { CgRemove } from "react-icons/cg";
const REMOVE_ICON = <CgRemove size={'20px'} />

function ActiveItem({ label, handleClick }) {
    return (
        <span className='active-item-container'>
            <p>{label}</p>
            <button form='none' onClick={handleClick}>{REMOVE_ICON}</button>
        </span>
    )
}

export default ActiveItem;