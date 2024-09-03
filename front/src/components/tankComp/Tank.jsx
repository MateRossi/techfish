import './Tank.css';
import { useState } from 'react';
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
import useDate from '../../hooks/use-date';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from '../modalComp/Modal';
import TankDetails from '../tankDetailsComp/TankDetails';

function Tank({ tanque }) {
    const formattedDate = useDate(tanque?.updatedAt);
    
    const [showModal, setShowModal] = useState(false);

    const handleTankClick = () => {
        setShowModal(true);
    }

    const handleTankClose = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    const actionBar = <div>
        <button onClick={handleTankClose} className='modal-close-button'>Confirmar</button>
        <button onClick={handleTankClose} className='modal-X-close-button'><IoCloseOutline size={30}/></button>
    </div>

    const modal = (
        <Modal onClose={handleTankClose} actionBar={actionBar} width='900px' height='600px'>
            <TankDetails tanqueId={tanque.id} />
        </Modal>
    )

    return (
        <div className="tank-item" onClick={handleTankClick}>
            <div className="tank-item-header">
                <div className="tank-header-info">
                    <div className="tank-info-column">
                        <h3>{tanque.nome}</h3>
                        <p>Quantidade de aparelhos: {tanque.aparelhosPresentes || 0}  </p>
                        <p>Volume do tanque: {tanque?.volumeAgua}L</p>
                        <p>Área do tanque: {tanque?.areaTanque}m²</p>
                    </div>
                    <div className="tank-options">
                        <button className="ac-edit-button" onClick={() => console.log('teste')}><EditIcon className='edit-icon' /></button>
                        <button className="ac-delete-button"><DeleteIcon className='delete-icon' /></button>
                    </div>
                </div>
                <div className="tank-current-values">
                    <h4>Última atualização feita em: {formattedDate}</h4>
                    <div className="tank-header-icons">
                        <PropertyValue value={tanque?.mediaDasLeituras?.o2 || '-'} icon={o2Icon} description={"O pH da água é uma medida da sua acidez ou alcalinidade, variando de 0 a 14. Valores abaixo de 7 indicam uma solução ácida, 7 é neutro, e acima de 7 é alcalino. A maioria dos organismos aquáticos prospera em um pH entre 6,5 e 8,5, sendo esses os limites ideais para a qualidade da água em ambientes naturais."} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.o2_mg || '-'} icon={o2mgIcon} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.orp || '-'} icon={orpIcon} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.ph || '-'} icon={phIcon} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.tds || '-'} icon={tdsIcon} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.temperatura || '-'} icon={tempIcon} />
                        <PropertyValue value={tanque?.mediaDasLeituras?.turbidez || '-'} icon={turbidezIcon} />
                    </div>
                </div>
            </div>
            {showModal && modal}
        </div>
    );
}

export default Tank;