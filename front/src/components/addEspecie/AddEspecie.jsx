import './AddEspecie.css';
import especiesImg from '../../img/especiesIcon.svg';
import { useState } from 'react';

export default function AddEspecie({ }) {
    const [errMsg, setErrMsg] = useState('');
    
    const handleSubmit = () => {
        console.log('teste')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <img src={especiesImg} className='modal-icon' alt="ícone de três peixes" style={{ border: 'none' }}/>
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <h2 className="modal-title">Adicionar Espécie</h2>
            <p>Adicione uma espécie para começar uma produção.</p>
            <button type='submit' className='modal-confirm-button'>Confirmar</button>
        </form>
    );
}