import { useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import useAuth from "../hooks/use-auth";

function TanqueEdit({ tanqueData, setTanqueData, setShowEditModal }) {
    const [nomeTanque, setNomeTanque] = useState(tanqueData.nome);
    const [areaTanque, setAreaTanque] = useState(tanqueData.areaTanque);
    const [volumeAgua, setVolumeAgua] = useState(tanqueData.volumeAgua);
    const [totalPeixes, setTotalPeixes] = useState(tanqueData.totalPeixes);
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosAtualizados = {
            nome: nomeTanque,
            areaTanque: areaTanque,
            volumeAgua: volumeAgua,
            totalPeixes: totalPeixes,
        };
        
        try {
            const response = await axiosPrivate.put(`/users/${auth?.id}/tanques/${tanqueData.id}`, dadosAtualizados);
            setTanqueData(response.data);
            setShowEditModal(false);
        } catch (err) {
            console.error(err.message);
            setErrMsg('Erro ao atualizar informações');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errMsg && <p>{errMsg}</p>}
            <h2 style={{marginBottom: 5}}>Editar Informações</h2>
            <div className="InputContainer">
                <label htmlFor="nomeTanque">Identificador do tanque: </label>
                <input
                    id="nomeTanque"
                    type="text"
                    value={nomeTanque}
                    onChange={(e) => setNomeTanque(e.target.value)}
                />
            </div>
            <div className="InputContainer">
                <label htmlFor="areaTanque">Área do tanque (m²): </label>
                <input
                    id="areaTanque"
                    type="number"
                    value={areaTanque}
                    onChange={(e) => setAreaTanque(e.target.value)}
                />
            </div>
            <div className="InputContainer">
                <label htmlFor="volumeAgua">Volume de água (litros): </label>
                <input
                    id="volumeAgua"
                    type="number"
                    value={volumeAgua}
                    onChange={(e) => setVolumeAgua(e.target.value)}
                />
            </div>
            <div className="InputContainer">
                <label htmlFor="totalPeixes">Quantidade total de peixes: </label>
                <input
                    id="totalPeixes"
                    type="number"
                    value={totalPeixes}
                    onChange={(e) => setTotalPeixes(e.target.value)}
                />
            </div>
            <button type="submit">Confirmar</button>
        </form>
    )
}

export default TanqueEdit;