import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import './Grafico.css';

function Grafico({ lista, camposParaMostrar }) {
    const values = {
        ph: 'black',
        temperatura: 'orange',
        tds: 'maroon',
        orp: 'green',
        turbidez: 'red',
        o2: 'blue',
        o2_mg: 'magenta'
    }

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY HH:mm');
    };

    return (
        <ResponsiveContainer height="100%" width={'100%'}>
            <LineChart data={lista} margin={{ top: 5, right: 55, left: 0, bottom: 5 }} height={'100%'} width={'100%'}>
                {camposParaMostrar.map(campo => (
                    <Line
                        key={campo}
                        type='monotone'
                        dataKey={campo}
                        strokeWidth={2}
                        stroke={values[campo]}
                    />
                ))}
                <CartesianGrid stroke='#ccc' strokeDasharray='2 2' />
                <XAxis
                    dataKey="data_hora"
                    interval="preserveStartEnd"
                    tickFormatter={formatDate}
                />
                <YAxis padding={{ top: 5, bottom: 5 }} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Grafico;