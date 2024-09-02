import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Tanque from "../components/Tanque";
import Carregando from "../components/Carregando";
import AddButton from "../components/AddButton";
import Modal from "../components/modalComp/Modal";
import TanqueAdd from "../components/TanqueAdd";
import PageTitle from "../components/pageTitleComp/PageTitle";
import SearchBar from "../components/searchBarComp/SearchBar";
import Accordion from "../components/accordionComp/Accordion";
import { IoCloseOutline } from "react-icons/io5";

function TanqueListPage() {
    const [tanques, setTanques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const getTanques = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques`);
                isMounted && setTanques(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getTanques();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate, location, navigate, setTanques]);

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
            <PageTitle title="Meus Tanques" description="Adicione, edite, monitore ou exclua tanques."/>
            <SearchBar elementToAdd={"Tanque"} handleAdd={handleAddClick}/>
            <Accordion value={tanques} />
            {showAddModal && addModal}
        </main>
    )
}

export default TanqueListPage;