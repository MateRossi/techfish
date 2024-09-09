import { useEffect, useState } from "react";
import tanqueIcon from '../../img/tanque.png';
import './TankEdit.css'
import AparelhoList from "../aparelhoListComp/AparelhoList";
import Dropdown from "../dropdownComp/Dropdown";
import useAxiosPrivate from "../../hooks/use-axios-private";
import useAuth from "../../hooks/use-auth";
import { CgRemoveR } from "react-icons/cg";
import { CgAddR } from "react-icons/cg";

function TankEdit({ tanque, handleEdit, setShowEditModal, setDestaque }) {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const removeIcon = <CgRemoveR size={'40px'} />
    const addIcon = <CgAddR size={'40px'} />

    const [nomeTanque, setNomeTanque] = useState(tanque.nome);
    const [areaTanque, setAreaTanque] = useState(tanque.areaTanque);
    const [volumeAgua, setVolumeAgua] = useState(tanque.volumeAgua);

    const [aparelhosParaRemover, setAparelhosParaRemover] = useState([]);
    const [aparelhosDisponiveis, setAparelhosDisponiveis] = useState([]);
    const [aparelhosParaAdicionar, setAparelhosParaAdicionar] = useState(tanque.aparelhos);
    const [aparelhoSelecionado, setAparelhoSelecionado] = useState(null);

    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    const [isModified, setIsModified] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dadosAtualizados = {
            ...tanque,
            nome: nomeTanque,
            areaTanque: areaTanque,
            volumeAgua: volumeAgua,
            aparelhosParaRemover: aparelhosParaRemover.map(aparelho => aparelho.id),
            aparelhosParaAdicionar: aparelhosParaAdicionar.map(aparelho => aparelho.id),
        }

        handleEdit(e, dadosAtualizados);
        setDestaque(dadosAtualizados);
        setShowEditModal(false);
    };

    const handleSelect = (aparelho) => {
        setAparelhoSelecionado(aparelho)
    }

    const handleInputChange = (setter) => (e) => {
        setIsModified(true); // Marcar como modificado
        setter(e.target.value);
    };

    const handleAddAparelho = () => {
        // Remove o aparelho selecionado da lista de aparelhos para remover (se já estiver na lista)
        setAparelhosParaRemover(prev => {
            return prev.filter(aparelho => aparelho.id !== aparelhoSelecionado.id);
        });

        setIsModified(true);

        // Adiciona o aparelho selecionado à lista de aparelhos no tanque
        setAparelhosParaAdicionar(prev => [...prev, aparelhoSelecionado]);

        // Remove o aparelho selecionado da lista de aparelhos disponíveis
        setAparelhosDisponiveis(prev =>
            prev.filter(aparelho => aparelho.id !== aparelhoSelecionado.id)
        );

        // Reseta o aparelho selecionado para null
        setAparelhoSelecionado(null);
    };


    useEffect(() => {
        let isMounted = true;
        const getAparelhos = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.id}/aparelhos`);
                if (isMounted) {
                    const aparelhosDisponiveisFiltrados = response.data.filter(
                        (aparelho) => !tanque.aparelhos.some((a) => a.id === aparelho.id)
                    );
                    setAparelhosDisponiveis(aparelhosDisponiveisFiltrados);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao obter aparelhos disponíveis')
            }
        }

        getAparelhos();

        return () => isMounted = false;
    }, [auth.id, axiosPrivate, tanque.aparelhos]);

    return (
        <div>
            <img src={tanqueIcon} className='modal-icon' alt="ícone de um tanque de peixes" />
            <form onSubmit={handleSubmit}>
                <h2 className="modal-title">Editar Informações</h2>
                <p>Edite as informações que compõe o tanque.</p>
                <div className="InputContainer">
                    <label htmlFor="nomeTanque">Identificador do tanque: </label>
                    <input
                        id="nomeTanque"
                        type="text"
                        value={nomeTanque}
                        onChange={handleInputChange(setNomeTanque)}
                    />
                </div>
                <div className="line-contaner">
                    <div className="InputContainer">
                        <label htmlFor="volumeAgua">Volume (em litros)* </label>
                        <input
                            id="volumeAgua"
                            type="number"
                            value={volumeAgua}
                            onChange={handleInputChange(setVolumeAgua)}
                        />
                    </div>
                    <div className="InputContainer">
                        <label htmlFor="areaTanque">Área (em metros quadrados)* </label>
                        <input
                            id="areaTanque"
                            type="number"
                            value={areaTanque}
                            onChange={handleInputChange(setAreaTanque)}
                        />
                    </div>
                </div>
                <h5>Aparelhos neste tanque: </h5>
                <AparelhoList
                    icon={removeIcon}
                    aparelhos={aparelhosParaAdicionar}
                    setAparelhos={setAparelhosParaAdicionar}
                    setAparelhosParaRemover={setAparelhosParaRemover}
                    setAparelhosDisponiveis={setAparelhosDisponiveis}
                    setIsModified={setIsModified}
                />
                <h5>Adicionar aparelho: </h5>
                {
                    aparelhosDisponiveis?.length > 0
                        ? <div className="add-aparelho-container">
                            <Dropdown options={aparelhosDisponiveis} value={aparelhoSelecionado} onChange={handleSelect} />
                            <button onClick={handleAddAparelho} disabled={!aparelhoSelecionado ? true : false}>{addIcon}</button>
                        </div>
                        : 'Nenhum aparelho disponível'
                }
                <button type="submit" className="modal-confirm-button" disabled={!isModified}>Salvar mudanças</button>
            </form>
        </div>
    );
}

export default TankEdit;