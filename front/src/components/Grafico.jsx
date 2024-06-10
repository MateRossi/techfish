import { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Grafico({ dados, campoParaMostrar, ranges }) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [dataWithTime, setDataWithTime] = useState([]);

    useEffect(() => {
        if (ranges[campoParaMostrar]) {
            setMinValue(ranges[campoParaMostrar].min);
            setMaxValue(ranges[campoParaMostrar].max);
        }
    }, [campoParaMostrar, ranges]);

    console.log(minValue, maxValue);

    useEffect(() => {
        setDataWithTime(() => {
            const updatedData = dados.map(item => ({
                ...item,
                time: item?.data_hora.match(/(\d{2}):(\d{2})/)[0]
            }));
            return updatedData;
        });
    }, [dados]);

    return (
        <ResponsiveContainer minHeight={400} >
            <LineChart data={dataWithTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                <Line type='monotone' dataKey={campoParaMostrar || 'ph'} strokeWidth={2} stroke="#176e17" />
                <CartesianGrid stroke='#ccc' strokeDasharray='2 2' />
                <XAxis dataKey={'time'} interval="PreserveStartEnd" />
                <YAxis domain={[minValue, maxValue]} padding={{ top: 10, bottom: 10 }} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Grafico;