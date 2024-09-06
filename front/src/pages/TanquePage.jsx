import { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import Carregando from "../components/Carregando";
import useAxiosPrivate from "../hooks/use-axios-private";
import aquario from '../img/aquario.svg';
import DateShow from "../components/DateShow";
import TanqueHeader from "../components/TanqueHeader";
import ListaAtributosTanque from "../components/ListaAtributosTanque";
import InfoCounter from "../components/InfoCounter";
import Grafico2 from "../components/Grafico2";
import Modal from '../components/modalComp/Modal';
import useLocalStorage from '../hooks/use-local-storage';
import './TanquePage.css';
import SeletorAtributo from "../components/SeletorAtributo";
import TanqueEdit from "../components/TanqueEdit";

function TanquePage() {
    const [tanqueData, setTanqueData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const { auth } = useAuth();
    const { tanqueId } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [atributosLeitura, setAtributosLeitura] = useLocalStorage('atributosLeitura', []);

    useEffect(() => {
        let isMounted = true;
        const getTanqueData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques/${tanqueId}`);
                if (isMounted) {
                    const data = response.data;

                    data.Aparelhos.forEach(aparelho => {
                        if (aparelho.Leituras) {
                            aparelho.Leituras.reverse();
                        }
                    });

                    setTanqueData(data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getTanqueData();

        return () => isMounted = false;
    }, []);

    const handleDelete = async () => {
        try {
            await axiosPrivate.delete(`/users/${auth.id}/tanques/${tanqueData.id}`);
            navigate(-1);
        } catch (err) {
            console.error(err.message);
        }
    }

    if (isLoading || !tanqueData) {
        return (
            <main className="Page">
                <Carregando height={'50px'} width={'50px'} />
            </main>
        )
    }

    const handleEditClick = () => {
        setShowEditModal(true);
    }

    const handleEditClose = () => {
        setShowEditModal(false);
    }

    const handleDeleteClose = () => {
        setShowCancelModal(false);
    }

    const handleDeleteClick = () => {
        setShowCancelModal(true);
    }

    const editActionbar = <div>
        <button onClick={handleEditClose} className="modal-close-button">Cancelar</button>
    </div>

    const editModal = (
        <Modal onClose={handleEditClose} actionBar={editActionbar}>
            <TanqueEdit tanqueData={tanqueData} setShowEditModal={setShowEditModal} setTanqueData={setTanqueData} />
        </Modal>
    )

    const cancelActionbar = <div style={{ width: '100%' }}>
        <button onClick={handleDelete} className="modal-delete-button">Confirmar</button>
        <button onClick={handleDeleteClose} className="modal-cancel-delete-button">Cancelar</button>
    </div>

    const cancelModal = (
        <Modal onClose={handleDeleteClose} actionBar={cancelActionbar}>
            <h2>Deseja realmente deletar o tanque {tanqueData.nome}?</h2>
        </Modal>
    )

    return (
        <main className="Page">
            <div className="TankDetails">
                <header className="TankDetailsHeader">
                    <img src={aquario} alt='peixe em um aquário' className='TankDetailsImg'></img>
                    <TanqueHeader nomeTanque={tanqueData.nome} />
                </header>
                <section className="infos-basicas-tanque">
                    <ListaAtributosTanque tanque={tanqueData} />
                    <div className="tanque-options">
                        <div>
                            <InfoCounter nomePropriedade={"Espécies: "} valor={tanqueData?.Especies?.length || 0} />
                            <InfoCounter nomePropriedade={"Aparelhos: "} valor={tanqueData?.Aparelhos?.length || 0} />
                        </div>
                        <div>
                            <button className="edit-button" onClick={handleEditClick}>Editar Tanque</button>
                            {showEditModal && editModal}
                            <button className="delete-button" onClick={handleDeleteClick}>Excluir Tanque</button>
                            {showCancelModal && cancelModal}
                        </div>
                    </div>
                </section>
                {tanqueData.Aparelhos && tanqueData.Aparelhos.length > 0 && (
                    <section className="aparelhos-tanque">
                        <SeletorAtributo setAtributosLeitura={setAtributosLeitura} atributosLeitura={atributosLeitura} />
                        {tanqueData.Aparelhos.map(aparelho => (
                            <div key={aparelho.id_aparelho_es} className="aparelho-tanque">
                                <div className="infos-grafico">
                                    <p>Gráfico referente ao aparelho: {aparelho.id_aparelho_es}</p>
                                    <p>Última atualização feita em: <DateShow listaLeituras={aparelho.Leituras} /></p>
                                </div>
                                <Grafico2 dados={aparelho.Leituras} camposParaMostrar={atributosLeitura} />
                            </div>
                        ))}
                    </section>
                )}

                {(!tanqueData.Aparelhos || tanqueData.Aparelhos.length === 0) && (
                    <div className="aviso-sem-aparelhos">Este tanque ainda não possui dados de monitoramento.</div>
                )}

            </div>
        </main>
    )
}

export default TanquePage;