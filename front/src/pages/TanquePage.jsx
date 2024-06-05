import { useEffect, useState } from "react";
import useAuth from "../hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import Carregando from "../components/Carregando";
import useAxiosPrivate from "../hooks/use-axios-private";
import aquario from '../img/aquario.svg';
import DateShow from "../components/DateShow";
import TanqueHeader from "../components/TanqueHeader";
import ListaAtributosTanque from "../components/ListaAtributosTanque";
import InfoCounter from "../components/InfoCounter";
import Grafico2 from "../components/Grafico2";
import useLocalStorage from '../hooks/use-local-storage';
import './TanquePage.css';
import SeletorAtributo from "../components/SeletorAtributo";

function TanquePage() {
    const [tanqueData, setTanqueData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const { tanqueId } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [atributoLeitura, setAtributoLeitura] = useLocalStorage('atributoLeitura', 'ph');

    useEffect(() => {
        let isMounted = true;
        const getTanqueData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques/${tanqueId}`);
                isMounted && setTanqueData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getTanqueData();

        return () => isMounted = false;
    }, []);

    if (isLoading || !tanqueData) {
        return (
            <main className="Page">
                <Carregando height={'50px'} width={'50px'} />
            </main>
        )
    }

    return (
        <main className="Page">
            <div className="TankDetails">
                <header className="TankDetailsHeader">
                    <img src={aquario} alt='peixe em um aquário' className='TankDetailsImg'></img>
                    <TanqueHeader nomeTanque={tanqueData.nome} />
                </header>
                <section className="infos-basicas-tanque">
                    <ListaAtributosTanque tanque={tanqueData} />
                    <div className="tanque-options">
                        <div>
                            <InfoCounter nomePropriedade={"Espécies: "} valor={tanqueData?.Especies?.length || 0} />
                            <InfoCounter nomePropriedade={"Aparelhos: "} valor={tanqueData?.Aparelhos?.length || 0} />
                        </div>
                        <div>
                            <button className="edit-button">Editar Tanque</button>
                            <button className="delete-button">Excluir Tanque</button>
                        </div>
                    </div>
                </section>
                {tanqueData.Aparelhos &&
                    <section className="aparelhos-tanque">
                        <SeletorAtributo setAtributoLeitura={setAtributoLeitura} />
                        {tanqueData.Aparelhos ? (
                            tanqueData.Aparelhos.map(aparelho => (
                                <div key={aparelho.id_aparelho_es} className="aparelho-tanque">
                                    <div className="infos-grafico">
                                        <p>Gráfico referente ao aparelho: {aparelho.id_aparelho_es}</p>
                                        <p>Última atualização feita em: <DateShow listaLeituras={aparelho.Leituras} /></p>
                                    </div>
                                    <Grafico2 dados={aparelho.Leituras} campoParaMostrar={atributoLeitura} />
                                </div>
                            ))
                        ) : (
                            <div>Este tanque ainda não possui dados de monitoramento.</div>
                        )}
                    </section>
                }
            </div>
        </main>
    )
}

export default TanquePage;