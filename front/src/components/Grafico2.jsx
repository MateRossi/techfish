import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Grafico2({dados, campoParaMostrar}) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [dadosComHora, setDadosComHora] = useState([]);

    useEffect(() => {
        setDadosComHora(() => {
            const updatedData = dados.map(item => ({
                ...item,
                time: item?.data_hora.match(/(\d{2}):(\d{2})/)[0]
            }));
            return updatedData;
        });
    }, [dados]);

    useEffect(() => {
        const valores = dados.map(item => item[campoParaMostrar]);
        const min = Math.min(...valores);
        const max = Math.max(...valores);
        setMinValue(min);
        setMaxValue(max);
    }, [dados, campoParaMostrar]);

    return (
        <ResponsiveContainer minHeight={400} >
            <LineChart data={dadosComHora} margin={{ top: 5, right: 55, left: 0, bottom: 5 }} >
                <Line type='monotone' dataKey={campoParaMostrar} strokeWidth={2} stroke="#176e17" />
                <CartesianGrid stroke='#ccc' strokeDasharray='2 2' />
                <XAxis dataKey={'time'} interval="PreserveStartEnd" />
                <YAxis domain={[minValue, maxValue]} padding={{ top: 5, bottom: 5 }} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Grafico2;