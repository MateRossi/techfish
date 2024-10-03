import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Carregando from "../components/Carregando";
import Modal from "../components/modalComp/Modal";
import AddTanque from "../components/addTanqueComp/AddTanque";
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
    const [changed, setChanged] = useState(false);

    const [searchTerm, setSerchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const handleEdit = async (e, tanque) => {
        e.stopPropagation();

        try {
            const response = await axiosPrivate.put(`/users/${auth.id}/tanques/${tanque.id}`, tanque);
            const tanqueAtualizado = response.data;
            setTanques(prevTanques => prevTanques.map(t => t.id === tanqueAtualizado.id ? tanqueAtualizado : t));
            setChanged(prev => !prev);
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
                    navigate('/auth', { state: { from: location }, replace: true });
                }
            }
        }

        getTanques();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate, location, navigate, changed]);

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
            <AddTanque setTanques={setTanques} setShowModal={setShowAddModal} setDestaque={setDestaque} />
        </Modal>
    )

    if (loading) {
        return (
            <main className="Page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    const handleSearchChange = (value) => {
        setSerchTerm(value);

        const filteredItems = tanques.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value)
            )
        );

        setFiltered(filteredItems);
    }

    const renderedTanks = () => {
        if (searchTerm) {
            return filtered.map((tanque) =>
                <Tank
                    tanque={tanque}
                    key={tanque.id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    destaque={destaque}
                    setDestaque={setDestaque}
                />
            )
        }

        if (tanques.length > 0) {
            return tanques.map((tanque) =>
                <Tank
                    tanque={tanque}
                    key={tanque.id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    destaque={destaque}
                    setDestaque={setDestaque}
                />
            );
        }

        return <p>Você ainda não cadastrou nenhum tanque.
            Adicione um novo clicando em <b>Adicionar Aparelho</b>.
        </p>
    }

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle title="Meus Tanques" description="Adicione, edite, monitore ou exclua tanques." />
            <SearchBar
                elementToAdd={"Tanque"}
                handleAdd={handleAddClick}
                searchTerm={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="tank-list-container">
                {renderedTanks()}
            </div>
            {showAddModal && addModal}
        </main>
    )
}

export default TanqueListPage;