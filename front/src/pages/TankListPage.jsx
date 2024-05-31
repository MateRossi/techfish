import TankListItem from "../components/TankListItem";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function TankListPage() {
    const [tanques, setTanques] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const getTanques = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques`);
                console.log(JSON.stringify(response.data));
                isMounted && setTanques(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getTanques();

        return () => isMounted = false;
    }, []);   


    return (
        <main className="Page">
            <TankListItem tankName={'JFAPES007'}/>
            {JSON.stringify(tanques)}
        </main>
    )
}

export default TankListPage;