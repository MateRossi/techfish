import './TankDetails.css';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useLocalStorage from '../../hooks/use-local-storage';
import SeletorAtributo from '../seletorAtributoComp/SeletorAtributo';
import Grafico from '../graficoComp/Grafico';
import Carregando from '../Carregando';

function TankDetails({ tanque }) {
    const [selected, setSelected] = useState(tanque?.aparelhos[0]);
    const [limit, setLimit] = useState(50);
    const [leituras, setLeituras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [atributosLeitura, setAtributosLeitura] = useLocalStorage('atributosLeitura', []);

    useEffect(() => {
        let isMounted = true;
        const getLeiturasAparelhoETanque = async () => {
            try {
                const response = await axiosPrivate.get(`/leituras/tanques/${tanque.id}`);
                if (isMounted) {

                    const leiturasObtidas = response.data;

                    setLeituras(leiturasObtidas?.reverse());
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao obter dados de monitoramento')
            }
        }

        getLeiturasAparelhoETanque();

        const intervalId = setInterval(() => {
            getLeiturasAparelhoETanque(); // Faz a chamada a cada 15 segundos
        }, 15000);

        return () => {
            isMounted = false;
            clearInterval(intervalId); // Limpa o intervalo ao desmontar
        };

    }, [axiosPrivate, limit, selected, tanque.id]);

    if (loading) {
        return <Carregando />
    }

    return (
        <div className='tank-details-modal'>
            <div className='grafico-modal-header'>
                <h3>Gráfico de medidas ao longo do tempo do tanque <span>{tanque.nome}</span></h3>
                <p>Selecione um ou mais atributos abaixo para detalhar.</p>
            </div>
            {leituras?.length === 0 ? <h1 className='sem-dados-grafico'>Não há dados para mostrar.</h1>
                : (
                    <>
                        <div>
                            <SeletorAtributo setAtributosLeitura={setAtributosLeitura} atributosLeitura={atributosLeitura} />
                        </div>
                        <div className='grafico-container'>
                            <Grafico lista={leituras} camposParaMostrar={atributosLeitura} />
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default TankDetails;