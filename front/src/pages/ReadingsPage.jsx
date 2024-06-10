import Grafico from '../components/Grafico';
//import SortableTable from '../components/SortableTable';
import { useReadings } from '../hooks/use-readings';
//import useTableConfig from '../hooks/use-table-config';
import './ReadingsPage.css';
import './Page.css';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';

function ReadingsPage() {
    const [selection, setSelection] = useState(null);
    const { readings, handleDateChange, selectedDate } = useReadings();
    //const {config, keyFn} = useTableConfig();

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
        <main className='Page'>
            <div className='Filters'>
            <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}/> 
            <Dropdown options={options} value={selection} onChange={handleSelection} />
            </div>
            <div className='GraphContainer'>
                <div><Grafico dados={readings?.rows} campoParaMostrar={selection?.value} /></div>
            </div>

            {/*<SortableTable data={readings} config={config} keyFn={keyFn} />*/}
        </main>
    );
}

export default ReadingsPage;