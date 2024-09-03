import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import TanqueIcon from "../../icons/ImagemIcon";
import './Accordion.css';
import PropertyValue from "../propertyValueComp/PropertyValue";
import o2Icon from '../../img/propriedades/o2Icon.png';
import o2mgIcon from '../../img/propriedades/o2mgIcon.png';
import orpIcon from '../../img/propriedades/orpIcon.png';
import phIcon from '../../img/propriedades/phIcon.png';
import tdsIcon from '../../img/propriedades/tdsIcon.png';
import tempIcon from '../../img/propriedades/tempIcon.png';
import turbidezIcon from '../../img/propriedades/turbidezIcon.png';
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";

function Accordion({ value }) {
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

        return (
            <div key={item.id} className="accordion-item">
                <div onClick={() => handleClick(index)} className="accordion-item-header">
                    <div className="accordion-header-info">
                        <div className="info-column">
                            <h3>{item.nome}</h3>
                            <p className="aparelhos">Quantidade de aparelhos: {item.aparelhosPresentes || 0}  </p>
                            <p>Volume do tanque: {item?.volumeAgua}L</p>
                            <p>Área do tanque: {item?.areaTanque}m²</p>
                        </div>
                    </div>
                    <div className="flex-column">
                        <h4 className="updated-at">Última atualização feita em: {new Date(item?.updatedAt).toISOString()}</h4>
                        <div className="accordion-header-icons">
                            <PropertyValue value={item?.mediaDasLeituras?.o2 || '-'} icon={o2Icon} description={"O pH da água é uma medida da sua acidez ou alcalinidade, variando de 0 a 14. Valores abaixo de 7 indicam uma solução ácida, 7 é neutro, e acima de 7 é alcalino. A maioria dos organismos aquáticos prospera em um pH entre 6,5 e 8,5, sendo esses os limites ideais para a qualidade da água em ambientes naturais."} />
                            <PropertyValue value={item?.mediaDasLeituras?.o2_mg || '-'} icon={o2mgIcon} />
                            <PropertyValue value={item?.mediaDasLeituras?.orp || '-'} icon={orpIcon} />
                            <PropertyValue value={item?.mediaDasLeituras?.ph || '-'} icon={phIcon} />
                            <PropertyValue value={item?.mediaDasLeituras?.tds || '-'} icon={tdsIcon} />
                            <PropertyValue value={item?.mediaDasLeituras?.temperatura || '-'} icon={tempIcon} />
                            <PropertyValue value={item?.mediaDasLeituras?.turbidez || '-'} icon={turbidezIcon} />
                        </div>
                    </div>
                    <div className="accordion-options">
                        <button className="ac-edit-button"><EditIcon className='edit-icon' /></button>
                        <button className="ac-delete-button"><DeleteIcon className='delete-icon' /></button>
                    </div>
                    {/*icone*/}
                </div>
                {isExpanded && <div className="accordion-content">{item.areaTanque}</div>}
            </div>
        );
    });

    return (
        <div className="accordion-container">{renderedItems}</div>
    );
}

export default Accordion;