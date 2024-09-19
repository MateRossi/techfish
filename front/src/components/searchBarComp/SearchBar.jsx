import LupaIcon from "../../icons/LupaIcon";
import "./SearchBar.css";

function SearchBar({ elementToAdd, handleAdd, searchTerm, onChange }) {
    const handleInputChange = (e) => {
        const value = e.target.value;
        onChange(value);
    }

    return (
        <div className="search-bar-container">
            <span className="search-bar-input-container">
                <LupaIcon className="search-bar-lupe-icon" />
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder={`Buscar ${elementToAdd}`}
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </span>
            <button className="search-bar-button" onClick={handleAdd}>Adicionar {elementToAdd}</button>
        </div>
    );
}

export default SearchBar;