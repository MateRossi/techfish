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
import Confirm from "../components/confirmDeleteComp/Confirm";
import { BsExclamationCircle } from "react-icons/bs";
import peixeIcon from '../img/peixeIcone.png';
import DadosVazios from "../components/dadosVaziosComp/DadosVazios";
import semEspecieIcon from '../img/semConteudo/semEspecies.png';

function EspeciesPage() {
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [especies, setEspecies] = useState([]);
    const [selected, setSelected] = useState(null);

    const [showImageModal, setShowImageModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const icon = <BsExclamationCircle className='modal-icon' color='orange' style={{ border: 0 }} />

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

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/users/${auth?.id}/especies/${id}`);
            const especiesList = especies.filter(especie => especie.id !== id);
            setEspecies(especiesList);
            setShowDeleteModal(false);
        } catch (err) {
            console.error(err.message);
            setErrMsg('Erro ao excluir especie');
        }
    }

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleModalClose = () => {
        setShowAddModal(false);
        setShowImageModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    if (loading) {
        return (
            <main className="Page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    const handleDeleteClick = (item) => {
        setSelected(item);
        setShowDeleteModal(true);
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

    const deleteModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height="200px">
            <Confirm onConfirm={() => handleDelete(selected.id)} icon={icon} title={`Confirmar exclusão da espécie ${selected?.nome}`} />
        </Modal>
    )

    const handleSearchChange = (value) => {
        setSearchTerm(value);

        const filteredItems = especies.filter(item =>
            Object.values(item).some(val =>
                String(val).toLocaleLowerCase().includes(value.toLowerCase())
            )
        );

        setFiltered(filteredItems);
    }

    const renderedEspecies = () => {
        if (searchTerm) {
            return (
                <EspeciesAccordion
                    value={filtered}
                    setValue={setEspecies}
                    setSelected={setSelected}
                    handleImageClick={handleImageClick}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                />
            );
        }

        if (especies.length > 0) {
            return (
                <EspeciesAccordion
                    value={especies}
                    setValue={setEspecies}
                    setSelected={setSelected}
                    handleImageClick={handleImageClick}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                />
            );
        }

        return <DadosVazios img={semEspecieIcon} string={'Especie'} />
    }

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle
                title='Espécies Cadastradas'
                description='Adicione, edite, consulte ou exclua espécies de peixes.'
                img={peixeIcon}
            />
            <SearchBar
                elementToAdd={"Espécie"}
                handleAdd={handleAddClick}
                searchTerm={searchTerm}
                onChange={handleSearchChange}
            />
            {renderedEspecies()}
            {showAddModal && addModal}
            {showImageModal && imageModal}
            {showEditModal && editModal}
            {showDeleteModal && deleteModal}
        </main>
    )
}

export default EspeciesPage;