import axios from '../api/axios';
import { useEffect, useState } from 'react';
import Grafico from '../components/Grafico';

function MonitoramentoPage() {
    const [monitoramentos, setMonitoramentos] = useState([]);
    
    useEffect(() => {
        axios.get('/monitoramentos')
            .then(response => {
                console.log('Get request successful:', response.data);
                setMonitoramentos(response.data);
            })
            .catch(error => {
                console.error('Could not GET /monitoramentos', error.message);
            });
    }, []);


    return (
        <>
            <h2>Gráfico de PH X Tempo</h2>
            <div><Grafico dados={monitoramentos} campoParaMostrar={'ph'}/></div>
        </>    
    );
}

export default MonitoramentoPage;