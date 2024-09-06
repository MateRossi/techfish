import { useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import useAuth from "../hooks/use-auth";
import './TanqueAdd.css';
import tanque from '../img/tanque.png';

function TanqueAdd({ setTanques, setShowModal }) {
    const [nomeTanque, setNomeTanque] = useState('');
    const [areaTanque, setAreaTanque] = useState('');
    const [volumeAgua, setVolumeAgua] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoTanque = {
            nome: nomeTanque,
            areaTanque,
            volumeAgua,
        };

        try {
            const response = await axiosPrivate.post(`/users/${auth?.id}/tanques`, novoTanque);
            const tanqueComId = { ...novoTanque, id: response.data.id };
            setTanques(prevTanques => [...prevTanques, tanqueComId]);
            setShowModal(false);
        } catch (err) {
            console.error(err.message);
            setErrMsg('Erro ao adicionar tanque');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={tanque} className='modal-icon' alt="ícone de um tanque de peixes" />
            {errMsg && <p className="errMsg">{errMsg}</p>}

            <h2 className="modal-title">Adicionar Tanque</h2>
            <p>Adicione um tanque para começar a monitorar a qualidade da produção.</p>
            <div className="InputContainer">
                <label htmlFor="nomeTanque">Identificador do tanque*</label>
                <input
                    id="nomeTanque"
                    type="text"
                    value={nomeTanque}
                    onChange={(e) => setNomeTanque(e.target.value)}
                />
            </div>
            <div className="line-contaner">
                <div className="InputContainer">
                    <label htmlFor="volumeAgua">Volume (em litros)* </label>
                    <input
                        id="volumeAgua"
                        type="number"
                        value={volumeAgua}
                        onChange={(e) => setVolumeAgua(e.target.value)}
                    />
                </div>
                <div className="InputContainer">
                    <label htmlFor="areaTanque">Área (em metros quadrados)* </label>
                    <input
                        id="areaTanque"
                        type="number"
                        value={areaTanque}
                        onChange={(e) => setAreaTanque(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="modal-confirm-button">Confirmar</button>
        </form>
    );
}

export default TanqueAdd;