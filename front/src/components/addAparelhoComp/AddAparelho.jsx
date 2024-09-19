import { useState } from "react";
import useAxiosPrivate from "../../hooks/use-axios-private";
import useAuth from "../../hooks/use-auth";
import ganhos from '../../img/ganhosIcon.svg';

function AddAparelho({ setAparelhos, setShowModal }) {
    const [aparelhoId, setAparelhoId] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoAparelho = {
            id: aparelhoId,
            userId: auth?.id 
        };

        try {
            const response = await axiosPrivate.post(`/users/${auth?.id}/aparelhos`, novoAparelho);
            setAparelhos(prevAparelhos => [...prevAparelhos, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error(error.message);
            setShowModal(false);
            setErrMsg('Erro ao adicionar aparelho')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={ganhos} className='modal-icon' alt="ícone de um tanque de peixes" />
            {errMsg && <p className="errMsg">{errMsg}</p>}

            <h2 className="modal-title">Adicionar Aparelho</h2>
            <p>Cadastre um aparelho e o adicione a um tanque para monitorar a qualidade da água.</p>
            <div className="InputContainer">
                <label htmlFor="aparelhoId">Identificador do aparelho*</label>
                <input
                    id="aparelhoId"
                    type="text"
                    value={aparelhoId}
                    onChange={(e) => setAparelhoId(e.target.value)}
                />
            </div>
            <button type="submit" className="modal-confirm-button">Confirmar</button>
        </form>
    )
}

export default AddAparelho;