import { useEffect, useState } from "react";
import moment from "moment";

function DateShow({ listaLeituras }) {
    const [dataHoraUltimaLeitura, setDataHoraUltimaLeitura] = useState(moment(listaLeituras[listaLeituras.length - 1].data_hora).format('DD/MM/yyyy HH:mm:ss'));

    useEffect(() => {
        setDataHoraUltimaLeitura(moment(listaLeituras[listaLeituras.length - 1].data_hora).format('DD/MM/yyyy HH:mm:ss'));
    }, [listaLeituras]);

    return (
        <>{dataHoraUltimaLeitura}</>
    );
}

export default DateShow;