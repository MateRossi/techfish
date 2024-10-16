import { useEffect, useState } from 'react';
import './TransacoesPage.css';
import PageTitle from '../components/pageTitleComp/PageTitle';
import SearchBar from '../components/searchBarComp/SearchBar';
import useAxiosPrivate from '../hooks/use-axios-private';
import useAuth from '../hooks/use-auth';
import Carregando from '../components/Carregando';
import Modal from '../components/modalComp/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import AddTransacao from '../components/addTransacaoComp/AddTransacao';
import ganhoIcon from '../img/ganhoIcone.png';
import SortableTable from '../components/SortableTable';
import GraficoPizza from '../components/pieChartComp/GraficoPizza';

export default function TransacoesPage() {
    const [errMsg, setErrMsg] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getTransacoes = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.id}/transacoes`);
                if (isMounted) {
                    setTransacoes(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setErrMsg(err.message);
                }
            }
        }

        getTransacoes(); // Faz a primeira chamada imediatamente

        return () => {
            isMounted = false;
        };
    }, [auth?.id, axiosPrivate]);

    const handleAddClick = () => {
        setShowAddModal(true);
    }

    const handleSearchChange = (value) => {
        setSearchTerm(value);

        const filteredItems = transacoes.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value)
            )
        );

        setFiltered(filteredItems);
    }

    const handleModalClose = () => {
        setShowAddModal(false);
    }

    const actionBar = <div>
        <button onClick={handleModalClose} className="modal-close-button">Cancelar</button>
        <button onClick={handleModalClose} className="modal-X-close-button"><IoCloseOutline size={30} /></button>
    </div>

    const addModal = (
        <Modal onClose={handleModalClose} actionBar={actionBar} height='415px'>
            <AddTransacao setTransacoes={setTransacoes} setShowModal={setShowAddModal}/>
        </Modal>
    )

    const renderedTransactions = () => {
        if (searchTerm) {
            return filtered.map((transacao) =>
                <div key={transacao.id}>{JSON.stringify(transacao)}</div>
            );
        }

        if (transacoes.length > 0) {
            return transacoes.map((transacao) =>
                <div key={transacao.id}>{JSON.stringify(transacao)}</div>
            )
        }

        return <p>Você ainda não cadastrou nenhuma transação.
            Adicione uma nova clicando em <b>Adicionar Transação</b>.
        </p>
    }

    if (loading) {
        return (
            <main className="Page">
                <Carregando width='50px' height='50px' />
            </main>
        )
    }

    if (transacoes?.length === 0) {
        return (
            <p>Você ainda não possui transações para cadastradas.
            Adicione novas clicando em <b>Adicionar Transação</b>.
        </p>  
        );
    }

    return (
        <main className='page'>
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <PageTitle title="Finanças" description="Faça o controle dos gastos e receitas da suas fazenda." img={ganhoIcon} />
            <SearchBar
                elementToAdd={"Transação"}
                handleAdd={handleAddClick}
                searchTerm={searchTerm}
                onChange={handleSearchChange}
            />
            <div className='transaction-list-container'>
                <GraficoPizza data={transacoes} />
                {renderedTransactions()}
                {/*<SortableTable data={transacoes} config={config} keyFn={keyFn} />*/}
            </div>
            {showAddModal && addModal}
        </main>
    );
}