import { useEffect, useState } from "react";
import moment from "moment";

function DateShow({ listaLeituras }) {
    const [dataHoraUltimaLeitura, setDataHoraUltimaLeitura] = useState(moment(listaLeituras[listaLeituras.length - 1].data_hora).add(3, 'hours').format('DD/MM/yyyy HH:mm:ss'));

    console.log('data e hora da ultima leitura: ', dataHoraUltimaLeitura);

    useEffect(() => {
        setDataHoraUltimaLeitura(moment(listaLeituras[listaLeituras.length - 1].data_hora).add(3, 'hours').format('DD/MM/yyyy HH:mm:ss'));
    }, [listaLeituras]);

    return (
        <>{dataHoraUltimaLeitura}</>
    );
}

export default DateShow;