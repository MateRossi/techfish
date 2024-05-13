import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const ReadingsContext = createContext();

function ReadingsProvider({ children }) {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString().slice(0, 10));
    const [readingsDetails, setReadingsDetails] = useState({});
    const [lastReadingTime, setLastReadingTime] = useState(null);

    useEffect(() => {
        axios.post('/leituras/por-data', { data: selectedDate })
            .then(response => {
                setReadings(response.data);
                setLastReadingTime(response.data?.rows[response.data?.rows.length - 1]?.data_hora);
                setLoading(false);
                getReadingsDetails(response.data.rows);
            })
            .catch(error => {
                console.error('Could not GET /leituras', error.message);
                setLoading(false);
            });
    }, [selectedDate]);

    const getReadingsDetails = (readings) => {
        const readingsDetails = {};
        if (readings.length > 0) {
            const attributes = Object.keys(readings[0]);

            attributes.forEach(attribute => {
                if (!isNaN(readings[0][attribute]) && attribute !== 'id') {
                    const values = readings.map(reading => reading[attribute]);
                    const obj = {
                        label: attribute,
                        min: Math.min(...values),
                        max: Math.max(...values),
                        lastValue: values[values.length - 1],
                    }
                    readingsDetails[attribute] = obj;
                }
            });
            setReadingsDetails(readingsDetails);
        }
    }

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <ReadingsContext.Provider value={{ readings, selectedDate, handleDateChange, readingsDetails, lastReadingTime }}>
            {children}
        </ReadingsContext.Provider>
    );
}

export default ReadingsProvider;