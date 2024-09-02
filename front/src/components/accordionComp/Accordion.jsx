import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import ImagemIcon from "../../icons/ImagemIcon";
import './Accordion.css';
import PropertyValue from "../propertyValueComp/PropertyValue";
import o2Icon from '../../img/propriedades/o2Icon.png';
import o2mgIcon from '../../img/propriedades/o2mgIcon.png';
import orpIcon from '../../img/propriedades/orpIcon.png';
import phIcon from '../../img/propriedades/phIcon.png';
import tdsIcon from '../../img/propriedades/tdsIcon.png';
import tempIcon from '../../img/propriedades/tempIcon.png';
import turbidezIcon from '../../img/propriedades/turbidezIcon.png';

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

        const icon = <span className="expanded-icon">
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </span>

        return (
            <div key={item.id} className="accordion-item">
                <div onClick={() => handleClick(index)} className="accordion-item-header">
                    <ImagemIcon className="accordion-header-icon" />
                    <div className="accordion-header-info">
                        <h3>{item.nome}</h3>
                        <p>Aparelhos monitorando este tanque: {item?.Aparelhos?.length || 0}  </p>
                        <p>Valores atualizados </p>
                    </div>
                    <div className="accordion-header-icons">
                        <PropertyValue value={14.00} icon={o2Icon} description={"O pH da água é uma medida da sua acidez ou alcalinidade, variando de 0 a 14. Valores abaixo de 7 indicam uma solução ácida, 7 é neutro, e acima de 7 é alcalino. A maioria dos organismos aquáticos prospera em um pH entre 6,5 e 8,5, sendo esses os limites ideais para a qualidade da água em ambientes naturais."}/>
                        <PropertyValue value={"-" || 32.00} icon={o2mgIcon} />
                        <PropertyValue value={300.00} icon={orpIcon} />
                        <PropertyValue value={-400.00} icon={phIcon} />
                        <PropertyValue value={200.00} icon={tdsIcon} />
                        <PropertyValue value={19.00} icon={tempIcon} />
                        <PropertyValue value={300.00} icon={turbidezIcon} />
                    </div>
                    <div className="accordion-item-options">
                        <button>E</button>
                        <button>X</button>
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