import { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import useAxiosPrivate from "../hooks/use-axios-private";
import Carregando from "../components/Carregando";
import PageTitle from "../components/pageTitleComp/PageTitle";
import aparelhoIcon from '../img/device.png';
import SearchBar from "../components/searchBarComp/SearchBar";
import DadosVazios from '../components/dadosVaziosComp/DadosVazios';
import semProducaoIcon from '../img/semConteudo/semProducao.png';
import Producao from "../components/producao/Producao";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../components/modalComp/Modal";
import AddProducao from "../components/addProducao/AddProducao";
import './ProducoesPage.css'

function ProducoesPage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [producoes, setProducoes] = useState([]);

    const [searchTerm, setSerchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const handleSearchChange = (value) => {
        setSerchTerm(value);

        const filteredItems = producoes.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFiltered(filteredItems);
    }

    useEffect(() => {
        let isMounted = true;
        const getProducoes = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.id}/producoes`);
                if (isMounted) {
                    setProducoes(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao buscar Producoes')
            }
        }

        getProducoes();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate]);

    const handleModalClose = () => {
        setShowAddModal(false);
    }

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    const actionBar = <div>
        <button onClick={handleModalClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleModalClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height="450px">
            <AddProducao setProducoes={setProducoes} setShowModal={setShowAddModal} />
        </Modal>
    );

    if (loading) {
        return (
            <main className="page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    const renderedProducoes = () => {
        if (searchTerm) {
            return <p>{JSON.stringify(filtered)}</p>
        }

        if (producoes.length > 0) {
            return (
                <div className="producoes">
                    {producoes.map(producao => (
                        <Producao key={producao.id} producao={producao} />
                    ))}
                </div>
            );
        }

        return <DadosVazios img={semProducaoIcon} string={'Producão'} />
    }

    return (
        <main className="page">
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle
                title={"Produções de Peixes"}
                description={"Gerencie suas produções em andamento, adicione novas ou consulte dados de cada fase específica."}
                img={aparelhoIcon}
            />
            <SearchBar
                elementToAdd={'Producao'}
                handleAdd={handleAddClick}
                searchTerm={searchTerm}
                onChange={handleSearchChange}
            />
            {renderedProducoes()}
            {showAddModal && addModal}
        </main>
    )
}

export default ProducoesPage;