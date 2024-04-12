import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const ReadingsContext = createContext();

function ReadingsProvider({ children }) {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/leituras')
            .then(response => {
                setReadings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Could not GET /leituras', error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <ReadingsContext.Provider value={readings}>
            {children}
        </ReadingsContext.Provider>
    );
}

export default ReadingsProvider;