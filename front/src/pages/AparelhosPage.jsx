import { useState, useEffect } from "react";
import PageTitle from "../components/pageTitleComp/PageTitle";
import SearchBar from "../components/searchBarComp/SearchBar";
import Carregando from '../components/Carregando';
import useAuth from '../hooks/use-auth';
import useAxiosPrivate from '../hooks/use-axios-private';
import { useNavigate } from 'react-router-dom';
import SortableTable from "../components/SortableTable";

function AparelhosPage() {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [aparelhos, setAparelhos] = useState([]);
    

    const handleAddClick = () => {
        console.log('clicked')
    }

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
            render: (aparelho) => aparelho.tanqueId || '-',
            sortValue: (aparelho) => aparelho.tanqueId,
        },
        {
            label: "Status",
            render: (aparelho) => aparelho.tanqueId ? 'Em uso' : 'Disponível',
            sortValue: (aparelho) => aparelho.tanqueId ? 'Em uso' : 'Disponível',
        },
        {
            label: "Ação",
            render: (aparelho) => <div className="table-actions"><button onClick={() => console.log(aparelho.id)}>Teste</button><button onClick={() => console.log(aparelho.id)}>Teste</button></div>
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
            <PageTitle title="Meus Aparelhos" description={"Cadastre, exclua ou consulte aparelhos."}/>
            <SearchBar elementToAdd="Aparelho" handleAdd={handleAddClick}/>
            <SortableTable data={aparelhos} config={config} keyFn={keyFn}/>
        </main>
    )
}
export default AparelhosPage;