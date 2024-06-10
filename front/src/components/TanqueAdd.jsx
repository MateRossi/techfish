import { useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import useAuth from "../hooks/use-auth";

function TanqueAdd({ setTanques, setShowModal }) {
    const [nomeTanque, setNomeTanque] = useState('');
    const [areaTanque, setAreaTanque] = useState('');
    const [volumeAgua, setVolumeAgua] = useState('');
    const [totalPeixes, setTotalPeixes] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoTanque = {
            nome: nomeTanque,
            areaTanque,
            volumeAgua,
            totalPeixes,
        };

        try {
            const response = await axiosPrivate.post(`/users/${auth?.id}/tanques`, novoTanque);
            const tanqueComId = { ...novoTanque, id: response.data.id};
            setTanques(prevTanques => [...prevTanques, tanqueComId]);
            setShowModal(false);
        } catch (err) {
            console.error(err.message);
            setErrMsg('Erro ao adicionar tanque');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errMsg && <p>{errMsg}</p>}
            <h2 style={{ marginBottom: 5 }}>Adicionar Tanque</h2>
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
    );
}

export default TanqueAdd;