import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import './Dropdown.css'


function Dropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divEl.current) {
                return;
            }

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen((currentIsOpen) => !currentIsOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div className="SelectOption" onClick={() => handleOptionClick(option)} key={option.value}>
                {option.label}
            </div>
        );
    });

    return (
        <div ref={divEl} className="Dropdown">
            <div className="DropdownPanel" onClick={handleClick} >
                {value?.label || 'Selecione...'}
                <GoChevronDown className="ChevronDown" />        
            </div>
            {isOpen && (
                <div className="DropdownOptions">
                    {renderedOptions}
                </div>
            )}
        </div>
    );
}

export default Dropdown;