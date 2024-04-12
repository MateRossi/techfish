import Grafico from '../components/Grafico';
import SortableTable from '../components/SortableTable';
import { useReadings } from '../hooks/use-readings';
import useTableConfig from '../hooks/use-table-config';

function ReadingsPage() {
    const readings = useReadings();
    const {config, keyFn} = useTableConfig();
    console.log(readings);

    return (
        <>
            <h2>Gráfico de PH X Tempo</h2>
            <div><Grafico dados={readings} campoParaMostrar={'ph'} /></div>
            <SortableTable data={readings} config={config} keyFn={keyFn} />
        </>
    );
}

export default ReadingsPage;