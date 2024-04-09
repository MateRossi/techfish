import axios from '../api/axios';
import { useEffect, useState } from 'react';
import Grafico from '../components/Grafico';
import SortableTable from '../components/SortableTable';

function LeiturasPage() {
    const [leituras, setLeituras] = useState([]);

    useEffect(() => {
        axios.get('/leituras')
            .then(response => {
                setLeituras(response.data);
            })
            .catch(error => {
                console.error('Could not GET /leituras', error.message);
            });
    }, []);

    const config = [
        {
            label: "ID",
            render: (leitura) => leitura.id,
            sortValue: (leitura) => leitura.id,
        },
        {
            label: "ID Aparelho",
            render: (leitura) => leitura.id_aparelho_es,
            sortValue: (leitura) => leitura.id_aparelho_es,
        },
        {
            label: "Data/Hora",
            render: (leitura) => leitura.data_hora,
            sortValue: (leitura) => leitura.data_hora,
        },
        {
            label: "PH",
            render: (leitura) => leitura.ph,
            sortValue: (leitura) => leitura.ph,
        },
        {
            label: "Temperatura",
            render: (leitura) => leitura.temperatura,
            sortValue: (leitura) => leitura.temperatura,
        },
        {
            label: "ORP",
            render: (leitura) => leitura.orp,
            sortValue: (leitura) => leitura.orp,
        },
        {
            label: "TDS",
            render: (leitura) => leitura.tds,
            sortValue: (leitura) => leitura.tds,
        },
        {
            label: "O2",
            render: (leitura) => leitura.o2,
            sortValue: (leitura) => leitura.o2,
        },
        {
            label: "O2mg",
            render: (leitura) => leitura.o2_mg,
            sortValue: (leitura) => leitura.o2_mg,
        },
        {
            label: "Turbidez",
            render: (leitura) => leitura.turbidez,
            sortValue: (leitura) => leitura.turbidez,
        },
    ];

    const keyFn = (leitura) => {
        return leitura.id;
    };

    return (
        <>
            <h2>Gráfico de PH X Tempo</h2>
            <div><Grafico dados={leituras} campoParaMostrar={'ph'} /></div>
            <SortableTable data={leituras} config={config} keyFn={keyFn} />
        </>
    );
}

export default LeiturasPage;