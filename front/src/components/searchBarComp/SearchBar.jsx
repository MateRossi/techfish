import "./SearchBar.css";

function SearchBar({ elementToAdd }) {
    return (
        <div className="search-bar-container">
            <input type="text" className="search-bar-input" placeholder={`Buscar ${elementToAdd}`}/>
            <button className="search-bar-button">Adicionar {elementToAdd}</button>
        </div>
    );
}

export default SearchBar;