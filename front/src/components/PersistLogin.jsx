import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/use-refresh-token";
import useAuth from "../hooks/use-auth";
import useLocalStorage from '../hooks/use-local-storage';

function PersistLogin() {
    const [isLoading, setisLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [ persist ] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setisLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setisLoading(false);

        return () => isMounted = false;
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
        console.log(`Login dentro de persist login: ${auth.id}`)
    }, [isLoading]);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Carregando...</p>
                    : <Outlet />
            }
        </>
    );
}

export default PersistLogin;