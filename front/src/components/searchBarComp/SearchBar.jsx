import LupaIcon from "../../icons/LupaIcon";
import "./SearchBar.css";

function SearchBar({ elementToAdd }) {
    return (
        <div className="search-bar-container">
            <span className="search-bar-input-container">
                <LupaIcon className="search-bar-lupe-icon" />
                <input type="text" className="search-bar-input" placeholder={`Buscar ${elementToAdd}`} />
            </span>
            <button className="search-bar-button">Adicionar {elementToAdd}</button>
        </div>
    );
}

export default SearchBar;