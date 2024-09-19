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
                const response = await axiosPrivate.get(`/leituras/tanques/${tanque.id}/aparelhos/${selected?.id}?page=1&limit=${limit}`);
                if (isMounted) {

                    const leiturasObtidas = response.data;

                    setLeituras(leiturasObtidas);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao obter dados de monitoramento')
            }
        }

        getLeiturasAparelhoETanque();

        return () => isMounted = false;
    }, [axiosPrivate, limit, selected, tanque.id]);
    
    const handleAparelhoClick = (aparelho) => {
        setSelected(aparelho);
    }

    if (loading) {
        return <Carregando />
    }

    if (!selected) {
        return <p>Este tanque não está sendo monitorado.</p>
    }

    return (
        <>
            <div className='select-aparelhos-container'>
                {tanque.aparelhos.length > 0 ? tanque.aparelhos.map((aparelho) => (
                    <button onClick={() => handleAparelhoClick(aparelho)} key={aparelho.id} className={selected.id === aparelho.id ? 'selected-aparelho-button' : 'aparelho-button'}>
                        {aparelho.id}
                    </button>
                )) : <p>Este tanque não está sendo monitorado</p>}
            </div>
            <div className='aparelho-selecionado-container'>
                <div>
                    <SeletorAtributo setAtributosLeitura={setAtributosLeitura} atributosLeitura={atributosLeitura} />
                </div>
                <div className='grafico-container' >
                    <Grafico lista={leituras} camposParaMostrar={atributosLeitura}/>
                </div>
            </div>
        </>
    )
}

export default TankDetails;