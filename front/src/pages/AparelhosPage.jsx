import { useState, useEffect } from "react";
import PageTitle from "../components/pageTitleComp/PageTitle";
import SearchBar from "../components/searchBarComp/SearchBar";
import Carregando from '../components/Carregando';
import useAuth from '../hooks/use-auth';
import useAxiosPrivate from '../hooks/use-axios-private';
import { useNavigate } from 'react-router-dom';
import SortableTable from "../components/SortableTable";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { IoCloseOutline } from "react-icons/io5";
import './AparelhosPage.css'
import Modal from "../components/modalComp/Modal";
import AddAparelho from "../components/addAparelhoComp/AddAparelho";
import EditAparelho from "../components/editAparelhoComp/EditAparelho";
import Confirm from "../components/confirmDeleteComp/Confirm";
import { BsExclamationCircle } from "react-icons/bs";

function AparelhosPage() {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();

    const delIcon = <BsExclamationCircle className='modal-icon' color='orange' style={{ border: 0 }} />

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [aparelhos, setAparelhos] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAparelho, setSelectedAparelho] = useState(null);

    const [searchTerm, setSerchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    const handleEdit = async (e, aparelho) => {
        e.stopPropagation();

        const tanqueAparelho = {
            tanqueId: aparelho?.tanqueId
        }

        try {
            const response = await axiosPrivate.put(`/aparelhos/${aparelho.id}/update-tanque`, tanqueAparelho);
            const aparelhoAtualizado = response.data;
            setAparelhos(prevAparelhos => prevAparelhos.map(a => a.id === aparelhoAtualizado.id ? aparelhoAtualizado : a));
        } catch (error) {
            console.error('Erro ao atualizar aparelho', error);
            setErrMsg('Erro ao atualizar o aparelho');
        }
    }

    const handleAddClick = () => {
        setSelectedAparelho(null);
        setShowAddModal(true);
    }

    const handleEditClick = (aparelho) => {
        setSelectedAparelho(aparelho)
        setShowEditModal(true);
    }

    const handleDeleteClick = (aparelho) => {
        setSelectedAparelho(aparelho);
        setShowDeleteModal(true);
    }

    const handleModalClose = () => {
        setSelectedAparelho(null)
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
    }

    const handleSearchChange = (value) => {
        setSerchTerm(value);

        const filteredItems = aparelhos.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value)
            )
        );

        setFiltered(filteredItems);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();

        try {
            await axiosPrivate.delete(`/users/${auth?.id}/aparelhos/${id}`);
            const aparelhosList = aparelhos.filter(aparelho => aparelho.id !== id);
            setAparelhos(aparelhosList);
            setShowDeleteModal(false);
            setSerchTerm('');
        } catch (err) {
            console.error(err);
            setErrMsg('Erro ao excluir aparelho');
        }
    }

    const actionBar = <div>
        <button onClick={handleModalClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleModalClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar}>
            <AddAparelho setAparelhos={setAparelhos} setShowModal={setShowAddModal} />
        </Modal>
    )

    const editModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar}>
            <EditAparelho aparelho={selectedAparelho} handleEdit={handleEdit} setShowModal={setShowEditModal} />
        </Modal>
    )

    const deleteModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height="200px">
            <Confirm
                onConfirm={(e) => handleDelete(e, selectedAparelho?.id)}
                icon={delIcon}
                title={`Confirmar exlusão do aparelho ${selectedAparelho?.id}`}
            />
        </Modal>
    )

    useEffect(() => {
        let isMounted = true;
        const getAparelhos = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/aparelhos`);
                if (isMounted) {
                    setAparelhos(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao buscar aparelhos')
                if (isMounted) {
                    navigate('/', { state: { from: location }, replace: true });
                }
            }
        }

        getAparelhos();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate, navigate]);

    const config = [
        {
            label: "Aparelho ID",
            render: (aparelho) => aparelho.id,
            sortValue: (aparelho) => aparelho.id,
        },
        {
            label: "Tanque",
            render: (aparelho) => aparelho?.tanque?.nome || '-',
            sortValue: (aparelho) => aparelho?.tanque?.nome,
        },
        {
            label: "Status",
            render: (aparelho) => aparelho.tanqueId
                ? <span className="em-uso">Em uso</span>
                : <span className="disponivel">Disponível</span>,
            sortValue: (aparelho) => aparelho.tanqueId ? 'Em uso' : 'Disponível',
        },
        {
            label: "Ação",
            render: (aparelho) => <div className="table-actions">
                <button onClick={() => handleEditClick(aparelho)}>
                    <EditIcon className='edit-icon' />
                </button>
                <button onClick={() => handleDeleteClick(aparelho)}>
                    <DeleteIcon className='delete-icon' />
                </button>
            </div>
        }
    ]

    const keyFn = (aparelho) => {
        return aparelho.id;
    }

    if (loading) {
        return <Carregando />
    }

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle title="Meus Aparelhos" description={"Cadastre, exclua ou consulte aparelhos."} />
            <SearchBar
                elementToAdd="Aparelho"
                handleAdd={handleAddClick}
                searchTerm={searchTerm}
                onChange={handleSearchChange}
            />
            {aparelhos.length !== 0 ?
                <SortableTable data={searchTerm ? filtered : aparelhos} config={config} keyFn={keyFn} />
                : <p>Você ainda não possui aparelhos aparelhos para monitorar a qualidade da água.
                    Adicione um novo clicando em <b>Adicionar Aparelho</b>.
                </p>
            }
            {showAddModal && addModal}
            {showEditModal && editModal}
            {showDeleteModal && deleteModal}
        </main>
    )
}
export default AparelhosPage;