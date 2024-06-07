import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Grafico2({dados, camposParaMostrar}) {
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
        if (camposParaMostrar.length === 0) return;
        const todosValores = camposParaMostrar.flatMap(campo => dados.map(item => item[campo]));
        const min = Math.min(...todosValores);
        const max = Math.max(...todosValores);
        setMinValue(min);
        setMaxValue(max);
    }, [dados, camposParaMostrar]);

    return (
        <ResponsiveContainer minHeight={400} >
             <LineChart data={dadosComHora} margin={{ top: 5, right: 55, left: 0, bottom: 5 }} >
                {camposParaMostrar.map(campo => (
                    <Line
                        key={campo}
                        type='monotone'
                        dataKey={campo}
                        strokeWidth={2}
                        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    />
                ))}
                <CartesianGrid stroke='#ccc' strokeDasharray='2 2' />
                <XAxis dataKey={'time'} interval="preserveStartEnd" />
                <YAxis domain={[minValue, maxValue]} padding={{ top: 5, bottom: 5 }} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Grafico2;