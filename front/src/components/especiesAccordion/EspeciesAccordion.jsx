import { useState } from 'react';
import './EspeciesAccordion.css';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import EspecieCard from '../especieCard/EspecieCard';

export default function EspeciesAccordion({ value }) {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (nextIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if (currentExpandedIndex === nextIndex) {
                return -1;
            } else {
                return nextIndex;
            };
        });
    };

    const renderedItems = value.map((item, index) => {
        const isExpanded = index === expandedIndex;

        const icon = <span className='accordion-icon'>
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </span>

        return (
            <div key={item.id}>
                <div onClick={() => handleClick(index)}>
                    <img src="" alt="" />
                    {item.nome}
                    {icon}
                </div>
                {isExpanded && <EspecieCard especie={item} />}
            </div>
        );
    });

    return (
        <div className=''>{renderedItems}</div>
    );
}