import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Carregando from "../components/Carregando";
import Modal from "../components/modalComp/Modal";
import TanqueAdd from "../components/addTanqueComp/AddTanque";
import PageTitle from "../components/pageTitleComp/PageTitle";
import SearchBar from "../components/searchBarComp/SearchBar";
import { IoCloseOutline } from "react-icons/io5";
import Tank from "../components/tankComp/Tank";
import './TankListPage.css';

function TanqueListPage() {
    const [tanques, setTanques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [destaque, setDestaque] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const handleEdit = async (e, tanque) => {
        e.stopPropagation();

        console.log("tanque recebido: ", tanque);

        try {
            const response = await axiosPrivate.put(`/users/${auth.id}/tanques/${tanque.id}`, tanque);
            const tanqueAtualizado = response.data;
            console.log(response);
            setTanques(prevTanques => prevTanques.map(t => t.id === tanqueAtualizado.id ? tanqueAtualizado : t));
        } catch (error) {
            console.error('Erro ao atualizar tanque', error);
            setErrMsg('Erro ao atualizar o tanque');
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();

        try {
            await axiosPrivate.delete(`/users/${auth?.id}/tanques/${id}`);
            const tanqueList = tanques.filter(tanque => tanque.id !== id);
            setTanques(tanqueList);
        } catch (err) {
            console.error(err.message);
            setErrMsg('Erro ao excluir tanque');
        }
    }

    useEffect(() => {
        let isMounted = true;
        const getTanques = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques`);
                if (isMounted) {
                    setTanques(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    navigate('/', { state: { from: location }, replace: true });
                }
            }
        }

        getTanques();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate, location, navigate]);

    useEffect(() => {
        let timeoutId;
        if (destaque) {
            timeoutId = setTimeout(() => {
                setDestaque(null);
            }, 1000);
        }

        // Limpa o timeout se o componente for desmontado ou se o destaque mudar
        return () => clearTimeout(timeoutId);
    }, [destaque, tanques]);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    const handleModalClose = () => {
        setShowAddModal(false);
    }

    const actionbar = <div>
        <button onClick={handleModalClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleModalClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleModalClose} actionBar={actionbar}>
            <TanqueAdd setTanques={setTanques} setShowModal={setShowAddModal} setDestaque={setDestaque} />
        </Modal>
    )

    if (loading) {
        return (
            <main className="Page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle title="Meus Tanques" description="Adicione, edite, monitore ou exclua tanques." />
            <SearchBar elementToAdd={"Tanque"} handleAdd={handleAddClick} />
            <div className="tank-list-container">
                {tanques?.length > 0 ? tanques.map((tanque) => (
                    <Tank
                        tanque={tanque}
                        key={tanque.id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        destaque={destaque}
                        setDestaque={setDestaque}
                    />
                )) : 'Sem tanques para mostrar'}
            </div>
            {showAddModal && addModal}
        </main>
    )
}

export default TanqueListPage;