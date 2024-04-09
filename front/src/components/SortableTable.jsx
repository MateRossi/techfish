import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import useSort from "../hooks/use-sort";
import Table from './Table';

function SortableTable(props) {
    const { config, data } = props;
    const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: () => (
                <th onClick={() => setSortColumn(column.label)}>
                    <div>
                        {getIcons(column.label, sortBy, sortOrder)}
                        {column.label}
                    </div>
                </th>
            ),
        };
    });

    return <Table {...props} data={sortedData} config={updatedConfig} />;
}

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return <div>
            <GoArrowUp />
            <GoArrowDown />
        </div>;
    }

    if (sortOrder === null) {
        return <div>
            <GoArrowUp />
            <GoArrowDown />
        </div>;
    } else if (sortOrder === 'asc') {
        return <div>
            <GoArrowUp />
        </div>;
    } else if (sortOrder === 'desc') {
        return <div>
            <GoArrowDown />
        </div>
    }
}

export default SortableTable;