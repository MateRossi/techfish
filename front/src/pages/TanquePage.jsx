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
import './TanquePage.css';

function TanquePage() {
    const [tanqueData, setTanqueData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const { tanqueId } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const getTanqueData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques/${tanqueId}`);
                console.log(response);
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
                    <DateShow formatedDate={'23/04/2023 20:33'} />
                    <TanqueHeader nomeTanque={tanqueData.nome} />
                </header>
                <section className="infos-basicas-tanque">
                    <ListaAtributosTanque tanque={tanqueData} />
                    <div className="counters">
                        <InfoCounter nomePropriedade={"Espécies: "} valor={tanqueData?.Especies?.length || 0} />
                        <InfoCounter nomePropriedade={"Aparelhos: "} valor={tanqueData?.Aparelhos?.length || 0} />
                    </div>
                    {/*Infos de cada aparelho: obter as leituras das últimas 24 horas para cada aparelho, já possui o id do aparelho através d
                        um possível .MAP no array de Aparelhos do tanque.
                    */}
                    {/*Infos de cada espécie presente no tanque. obtidas da mesma forma que os aparelhos*/}
                </section>
            </div>
        </main>
    )
}

export default TanquePage;