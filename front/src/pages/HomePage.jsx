import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import PageTitle from "../components/pageTitleComp/PageTitle";
import house from '../img/houseicone.svg';

export default function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        if (!auth?.accessToken) {
            if (isMounted) {
                navigate('/auth', { state: { from: location }, replace: true });
            }
        }

        return () => isMounted = false;
    }, [auth?.accessToken, location, navigate]);

    return (
        <main className="page">
            <PageTitle 
                title={"Página em construção."}
                img={house}
            />
        </main>
    )
}