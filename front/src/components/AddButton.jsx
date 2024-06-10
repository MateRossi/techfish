import { FaPlus } from "react-icons/fa";
import './AddButton.css';

function AddButton({ handleClick }) {
    return (
        <button className="add-button" onClick={handleClick}><FaPlus size={30}/></button>
    );
}

export default AddButton;