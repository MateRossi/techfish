import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function Grafico({ dados, campoParaMostrar, ranges }) {

    if (!dados || dados.length === 0) {
        return <div>Carregando...</div>;
    }

    const dataWithTime = dados.map(item => ({
        ...item,
        time: item?.data_hora.match(/(\d{2}):(\d{2})/)[0]
    }));

    const minValue = ranges[campoParaMostrar].min;
    const maxValue = ranges[campoParaMostrar].max;

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