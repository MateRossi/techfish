import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import Tanque from "../components/Tanque";
import Carregando from "../components/Carregando";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import TanqueAdd from "../components/TanqueAdd";

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
        <main className="tank-list-page">
            {tanques.map(tanque => (
                <Tanque
                key={tanque.id}
                tanqueId={tanque.id} 
                nomeTanque={tanque.nome}
                aparelhos={tanque.Aparelhos}
                totalPeixes={tanque.totalPeixes}
                areaTanque={tanque.areaTanque}
                volumeAgua={tanque.volumeAgua} 
                />
            )).reverse()}
            <AddButton handleClick={handleAddClick}/>
            {showAddModal && addModal}
        </main>
    )
}

export default TanqueListPage;