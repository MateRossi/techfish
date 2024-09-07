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
    const [showAddModal, setShowAddModal] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

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

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    const handleAddClose = () => {
        setShowAddModal(false);
    }

    const addActionbar = <div>
        <button onClick={handleAddClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleAddClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleAddClose} actionBar={addActionbar}>
            <TanqueAdd setTanques={setTanques} setShowModal={setShowAddModal} />
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
                    <Tank tanque={tanque} key={tanque.id} handleDelete={handleDelete} />
                )) : 'Sem tanques para mostrar'}
            </div>
            {showAddModal && addModal}
        </main>
    )
}

export default TanqueListPage;