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
import Confirm from '../confirmDeleteComp/Confirm';
import { BsExclamationCircle } from "react-icons/bs";
import TankEdit from '../tankEditComp/TankEdit';

function Tank({ tanque, handleDelete, handleEdit, destaque, setDestaque }) {
    const formattedDate = useDate(tanque?.leituras?.[0]?.data_hora);
    const ultimaLeitura = tanque?.leituras?.[0] || {};

    const icon = <BsExclamationCircle className='modal-icon' color='orange' style={{ border: 0 }}/>

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleTankClick = () => {
        setShowDetailsModal(true);
    }
    
    const handleTankClose = (e) => {
        e.stopPropagation();
        setShowDetailsModal(false);
        setShowDeleteModal(false);
        setShowEditModal(false);
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
    }

    const handleEditClick = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
    }

    const actionBar = <div>
        <button onClick={handleTankClose} className='modal-close-button'>Cancelar</button>
        <button onClick={handleTankClose} className='modal-X-close-button'><IoCloseOutline size={30}/></button>
    </div>

    const detailsModal = (
        <Modal onClose={handleTankClose} actionBar={actionBar} width='900px' height='600px'>
            <TankDetails tanqueId={tanque.id} />
        </Modal>
    );

    const deleteModal = (
        <Modal onClose={handleTankClose} actionBar={actionBar} height='200px'>
            <Confirm onConfirm={(e) => handleDelete(e, tanque.id)} icon={icon} title={`Confirmar exclusão do tanque ${tanque.nome}`} />
        </Modal>
    );

    const editModal = (
        <Modal onClose={handleTankClose} actionBar={actionBar} height='600px'>
            <TankEdit tanque={tanque} handleEdit={handleEdit} setShowEditModal={setShowEditModal} setDestaque={setDestaque} />
        </Modal>
    );

    return (
        <div className={destaque?.id === tanque.id ? "tank-item-highlight": "tank-item" } onClick={handleTankClick} >
            <div className="tank-item-header">
                <div className="tank-header-info">
                    <div className="tank-info-column">
                        <h3>{tanque.nome}</h3>
                        <p>Quantidade de aparelhos: {tanque?.aparelhosNoTanque || 0}  </p>
                        <p>Volume do tanque: {tanque?.volumeAgua}L</p>
                        <p>Área do tanque: {tanque?.areaTanque}m²</p>
                    </div>
                    <div className="tank-options">
                        <button className="ac-edit-button" onClick={handleEditClick}><EditIcon className='edit-icon' /></button>
                        <button className="ac-delete-button" onClick={handleDeleteClick}><DeleteIcon className='delete-icon' /></button>
                    </div>
                </div>
                <div className="tank-current-values">
                    <h4>Última atualização feita em: {formattedDate}</h4>
                    <div className="tank-header-icons">
                        <PropertyValue value={ultimaLeitura.o2 || '-'} icon={o2Icon} description={"Níveis baixos de oxigênio podem indicar problemas na qualidade da água, enquanto níveis adequados (geralmente entre 5% e 10% de saturação) são cruciais para a saúde dos peixes e outros organismos. A saturação ideal pode variar dependendo da temperatura e pressão atmosférica."}/>
                        <PropertyValue value={ultimaLeitura.o2_mg || '-'} icon={o2mgIcon} description={"Mede a concentração de oxigênio dissolvido na água, em mg/L. Níveis adequados geralmente variam entre 5 e 10 mg/L, dependendo da temperatura e da pressão atmosférica. Níveis baixos podem levar a condições de estresse ou mortalidade para peixes e outros organismos."}/>
                        <PropertyValue value={ultimaLeitura.orp || '-'} icon={orpIcon} description={"Valores positivos sugerem um ambiente oxidante, enquanto valores negativos indicam um ambiente redutor. O ORP pode influenciar a eficácia de processos de desinfecção e a saúde geral do ecossistema aquático. Níveis típicos variam de 200 a 700 mV, dependendo das condições e dos processos químicos na água."}/>
                        <PropertyValue value={ultimaLeitura.ph || '-'} icon={phIcon} description={"O pH da água é uma medida da sua acidez ou alcalinidade, variando de 0 a 14. Valores abaixo de 7 indicam uma solução ácida, 7 é neutro, e acima de 7 é alcalino. A maioria dos organismos aquáticos prospera em um pH entre 6,5 e 8,5, sendo esses os limites ideais para a qualidade da água em ambientes naturais."} />
                        <PropertyValue value={ultimaLeitura.tds || '-'} icon={tdsIcon} description={"Mede a quantidade total de substâncias dissolvidas na água, incluindo sais, minerais e metais. Níveis elevados podem afetar a qualidade da água, tornando-a turva e alterando o equilíbrio de nutrientes. Valores típicos para água potável variam entre 50 e 500 mg/L, dependendo da origem e do tratamento da água."}/>
                        <PropertyValue value={ultimaLeitura.temperatura || '-'} icon={tempIcon} description={"Mede a temperatura da água. Afeta a solubilidade de gases, como o oxigênio, e a atividade metabólica dos organismos aquáticos. A maioria dos organismos prospera em uma faixa de temperatura específica, que varia de acordo com a espécie. Em geral, para ambientes naturais, a temperatura ideal da água pode variar entre 10°C e 25°C."}/>
                        <PropertyValue value={ultimaLeitura.turbidez || '-'} icon={turbidezIcon} description={"Valores mais altos significam maior turbidez, o que pode reduzir a penetração da luz e afetar a saúde dos organismos aquáticos. A turbidez é influenciada por partículas como sedimentos, algas e poluentes. Idealmente, a turbidez deve ser baixa para manter a qualidade da água e a saúde dos ecossistemas aquáticos."}/>
                    </div>
                </div>
            </div>
            {showDetailsModal && detailsModal}
            {showDeleteModal && deleteModal}
            {showEditModal && editModal}
        </div>
    );
}

export default Tank;