import { useEffect, useState, useRef } from 'react'
import { GoChevronDown } from 'react-icons/go';
import './Dropdown.css'

function Dropdown({ options, value, onChange, label }) {
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
            <div className='dropdown-option' onClick={() => handleOptionClick(option)} key={option.id || option[label]}>
                {option[label] || option.id}
            </div>
        );
    });

    return (
        <div ref={divEl} className='dropdown-container'>
            <div 
                className="dropdown-current" 
                onClick={handleClick}
            >
                {value?.[label] || value?.id || 'Selecione...'}
                <GoChevronDown />
            </div>
            {isOpen && (
                <div className='dropdown-options'>
                    {renderedOptions}
                </div>
            )}
        </div>
    );
}

export default Dropdown;