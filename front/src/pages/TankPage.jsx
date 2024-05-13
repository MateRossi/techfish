import './Page.css';
import './TankPage.css';
import aquario from '../img/aquario.svg';
import { useReadings } from '../hooks/use-readings';
import AttributeItem from '../components/AttributeItem';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';
import Grafico from '../components/Grafico';
import moment from 'moment';

function TankPage() {
    const [selection, setSelection] = useState(null);
    const {
        readingsDetails,
        handleDateChange,
        readings,
        selectedDate,
        lastReadingTime,
    } = useReadings();

    const formattedDate = moment(lastReadingTime).add(3, 'hours').format('DD/MM/yyyy HH:mm:ss');

    const renderedAttributeItems = Object.keys(readingsDetails).map((attributeName, index) => {
        const { max, min } = readingsDetails[attributeName];
        return <AttributeItem attributeName={attributeName} maxValue={max} minValue={min} key={index} />
    });

    const options = [
        { label: 'PH', value: 'ph' },
        { label: 'Temperatura', value: 'temperatura' },
        { label: 'ORP', value: 'orp' },
        { label: 'TDS', value: 'tds' },
        { label: 'O2', value: 'o2' },
        { label: 'O2 mg', value: 'o2_mg' },
        { label: 'Turbidez', value: 'turbidez' },
    ];

    const handleSelection = (option) => {
        setSelection(option);
    };

    return (
        <main className="Page">
            <div className='TankDetails'>
                <header className='TankDetailsHeader'>
                    <img src={aquario} alt='peixe em um aquário' className='TankDetailsImg'></img>
                    <div className='DateTime'>
                        <h3> Última Atualização </h3>
                        <p>{formattedDate}</p>
                    </div>
                    <div className='TankDetailsName'>
                        <h3>Tanque</h3>
                        <p>#JF0044239</p>
                    </div>
                </header>
                
                <div className='TankDetailsCurrent'>
                    {renderedAttributeItems}
                </div>
                <div className='FilterContainer'>
                    <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                    <Dropdown options={options} value={selection} onChange={handleSelection} />
                </div>
                <div className='GraphContainer'>
                    <Grafico dados={readings?.rows} campoParaMostrar={selection?.value || 'ph'} ranges={readingsDetails} />
                </div>
            </div>
        </main>
    )
}

export default TankPage;