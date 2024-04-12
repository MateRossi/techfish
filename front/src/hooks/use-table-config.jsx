import { useMemo } from "react";

function useTableConfig() {
    const config =  useMemo(() => [
        {
            label: "ID",
            render: (reading) => reading.id,
            sortValue: (reading) => reading.id,
        },
        {
            label: "ID Aparelho",
            render: (reading) => reading.id_aparelho_es,
            sortValue: (reading) => reading.id_aparelho_es,
        },
        {
            label: "Data/Hora",
            render: (reading) => reading.data_hora,
            sortValue: (reading) => reading.data_hora,
        },
        {
            label: "PH",
            render: (reading) => reading.ph,
            sortValue: (reading) => reading.ph,
        },
        {
            label: "Temperatura",
            render: (reading) => reading.temperatura,
            sortValue: (reading) => reading.temperatura,
        },
        {
            label: "ORP",
            render: (reading) => reading.orp,
            sortValue: (reading) => reading.orp,
        },
        {
            label: "TDS",
            render: (reading) => reading.tds,
            sortValue: (reading) => reading.tds,
        },
        {
            label: "O2",
            render: (reading) => reading.o2,
            sortValue: (reading) => reading.o2,
        },
        {
            label: "O2mg",
            render: (reading) => reading.o2_mg,
            sortValue: (reading) => reading.o2_mg,
        },
        {
            label: "Turbidez",
            render: (reading) => reading.turbidez,
            sortValue: (reading) => reading.turbidez,
        },
    ], []);

    const keyFn = (reading) => {
        return reading.id;
    };

    return {
        config,
        keyFn
    };
}

export default useTableConfig;