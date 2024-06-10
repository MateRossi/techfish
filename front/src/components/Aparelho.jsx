import './Aparelho.css'
import DateShow from './DateShow';

function Aparelho({ valoresAtuais, aparelhoId }) {
    return (
        <div className='device-info'>
            Aparelho: {aparelhoId} <br />
            Última atualização feita em: <DateShow listaLeituras={valoresAtuais} />
            <ul className="device-info-list">
                <li>O&#8322;: {valoresAtuais[0].o2}</li>
                <li>O&#8322;mg: {valoresAtuais[0].o2_mg}</li>
                <li>ORP: {valoresAtuais[0].orp}</li>
                <li>PH: {valoresAtuais[0].ph}</li>
                <li>TDS: {valoresAtuais[0].tds}</li>
                <li>Temperatura: {valoresAtuais[0].temperatura}</li>
                <li>Turbidez: {valoresAtuais[0].turbidez}</li>
            </ul>
        </div>
    );
}

export default Aparelho;