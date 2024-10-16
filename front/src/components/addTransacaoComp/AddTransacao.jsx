import { useState } from 'react';
import './AddTransacao.css';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useAuth from '../../hooks/use-auth';
import GanhosIcon from '../../img/GanhosIcon.svg';
import Dropdown from '../dropdownComp/Dropdown';

export default function AddTransacao({ setTransacoes, setShowModal }) {
    const [tipo, setTipo] = useState(null);
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const dropdownOptions = [
        { label: 'DESPESA', value: 'DESPESA' },
        { label: 'RECEITA', value: 'RECEITA' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaTransacao = {
            tipo: tipo.value,
            valor: parseFloat(valor),
            descricao
        };

        try {
            const response = await axiosPrivate.post(`users/${auth.id}/transacoes`, novaTransacao);
            setTransacoes(prevTransacoes => [...prevTransacoes, response.data]);
            setShowModal(false);
        } catch (err) {
            console.error(err);
            setErrMsg('Erro ao adicionar transação');
        }
    }

    console.log(tipo);

    return (
        <form onSubmit={handleSubmit}>
            <img src={GanhosIcon} className='modal-icon' alt='ícone de finanças' />
            {errMsg && <p className="errMsg">{errMsg}</p>}

            <h2 className='modal-title'>Adicionar Transação</h2>
            <p>Adicione transações para controlar o fluxo de gastos.</p>
            <div className='line-container-select'>
                <div className='InpuContainer'>
                    <label>Tipo de transação*: </label>
                    <Dropdown label={'label'} options={dropdownOptions} value={tipo} onChange={setTipo} />
                </div>
                <div className='InpuContainer'>
                    <label htmlFor='valorTransacao'>Valor*(R$): </label>
                    <input
                        id='valorTransacao'
                        type='number'
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>
            </div>
            <input
                type='textbox'
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <button type='submit' className='modal-confirm-button'>Confirmar</button>
        </form>
    );
}