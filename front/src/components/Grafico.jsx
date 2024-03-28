import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// eslint-disable-next-line react/prop-types
function Grafico({ dados, campoParaMostrar }) {
    return (
        <LineChart width={800} height={400} data={dados} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type='monotone' dataKey={campoParaMostrar} stroke='#8884d8' />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5'/>
            <XAxis dataKey='orp' />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}

export default Grafico;