import { useMemo, useState } from 'react';
import './EspeciesAccordion.css';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import EspecieCard from '../especieCard/EspecieCard';
import defaultFish from '../../img/defaultFish.png';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import ImagemIcon from '../../icons/ImagemIcon';

const BASE_URL = 'http://localhost:3500/';

export default function EspeciesAccordion({ value, handleImageClick, handleEditClick, handleDeleteClick }) {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (nextIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if (currentExpandedIndex === nextIndex) {
                return -1;
            } else {
                return nextIndex;
            }
        });
    };

    const renderedItems = value.map((item, index) => {
        const isExpanded = index === expandedIndex;

        const icon = <span className='accordion-icon'>
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </span>

        return (
            <div key={item.id} className='especie-accordion-container'>
                <div className='especie-card-icons'>
                    <button onClick={() => handleImageClick(item)}><ImagemIcon className='picture-icon' /></button>
                    <button onClick={() => handleEditClick(item)}><EditIcon className='edit-icon' /></button>
                    <button onClick={() => handleDeleteClick(item)}><DeleteIcon className='delete-icon' /></button>
                </div>
                <div onClick={() => handleClick(index)}>
                    <img
                        src={BASE_URL + item.imgUrl}
                        alt={`imagem de um peixe da espécie ${item.nome}`}
                        onError={(e) => {
                            e.target.src = defaultFish
                        }}
                    />
                    <div className='especie-accordion-header-texts'>
                        <h3>{item.nome}</h3>
                        <span className='text-icon'>Condições ideais para criação:
                            {icon}</span>
                    </div>
                </div>
                {isExpanded && <EspecieCard especie={item} />}
            </div>
        );
    });

    return (
        <div className='especies-accordion'>{renderedItems}</div>
    );
}