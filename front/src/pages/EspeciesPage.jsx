import { useEffect, useState } from "react";
import PageTitle from "../components/pageTitleComp/PageTitle";
import SearchBar from "../components/searchBarComp/SearchBar";
import Carregando from "../components/Carregando";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../components/modalComp/Modal";
import AddEspecie from "../components/addEspecie/AddEspecie";
import EspeciesAccordion from "../components/especiesAccordion/EspeciesAccordion";
import ImageUpload from "../components/imageUploadComp/ImageUpload";
import EditEspecie from "../components/editEspecieComp/EditEspecie";

function EspeciesPage() {
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [especies, setEspecies] = useState([]);
    const [selected, setSelected] = useState(null);

    const [showImageModal, setShowImageModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const getEspecies = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/especies`);
                if (isMounted) {
                    setEspecies(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    navigate('/auth', { state: { from: location }, replace: true });
                }
            }
        }

        getEspecies();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate, location, navigate, selected]);

    useEffect(() => {
        console.log(especies);
    }, [especies]);

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleModalClose = () => {
        setShowAddModal(false);
        setShowImageModal(false);
        setShowEditModal(false);
    };

    if (loading) {
        return (
            <main className="Page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    const handleDeleteClick = () => {
        console.log('delete clicked');
    }

    const handleEditClick = (item) => {
        setSelected(item);
        setShowEditModal(true);
    }

    const handleImageClick = (item) => {
        setSelected(item);
        setShowImageModal(true);
    }

    const actionBar = <div>
        <button onClick={handleModalClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleModalClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height="610px">
            <AddEspecie setEspecies={setEspecies} setShowModal={setShowAddModal} />
        </Modal>
    );

    const imageModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height='410px'>
            <ImageUpload item={selected} setSelected={setSelected} setShowModal={setShowImageModal} setErrMsg={setErrMsg} />
        </Modal>
    );

    const editModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height="610px">
            <EditEspecie especie={selected} setEspecies={setEspecies} setShowModal={setShowEditModal} />
        </Modal>
    );

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle
                title='Espécies Cadastradas'
                description='Adicione, edite, consulte ou exclua espécies de peixes.'
            />
            <SearchBar
                elementToAdd={"Espécie"}
                handleAdd={handleAddClick}
            />
            <EspeciesAccordion
                value={especies}
                setValue={setEspecies}
                setSelected={setSelected}
                handleImageClick={handleImageClick}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />
            {showAddModal && addModal}
            {showImageModal && imageModal}
            {showEditModal && editModal}
        </main>
    )
}

export default EspeciesPage;