import { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import useAxiosPrivate from "../hooks/use-axios-private";
import Carregando from "../components/Carregando";
import PageTitle from "../components/pageTitleComp/PageTitle";
import aparelhoIcon from '../img/device.png';
import SearchBar from "../components/searchBarComp/SearchBar";
import DadosVazios from '../components/dadosVaziosComp/DadosVazios';
import semProducaoIcon from '../img/semConteudo/semProducao.png';

function ProducoesPage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [producoes, setProducoes] = useState([]);

    const [searchTerm, setSerchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

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
                const response = await axiosPrivate.get(`/users/${auth?.id}/producoes`);
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

    const handleAddClick = () => {
        console.log('Clicked');
    }

    if (loading) {
        return (
            <main className="page">
                <Carregando width='50px' height='50p' />
            </main>
        )
    }

    const renderedProducoes = () => {
        if (searchTerm) {
            return <p>{JSON.stringify(filtered)}</p>
        }
        
        if (producoes.length > 0) {
            return <p>{JSON.stringify(producoes)}</p>
        }

        return <DadosVazios img={semProducaoIcon} string={'Producão'}/>
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
        </main>
    )
}

export default ProducoesPage;