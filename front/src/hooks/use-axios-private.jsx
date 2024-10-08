import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./use-refresh-token";
import useAuth from "./use-auth";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                config.url = config.url.replace('undefined', auth.id);
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { accessToken, id } = await refresh();
                    console.log(accessToken, id);
                    prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    prevRequest.url = prevRequest.url.replace('undefined', id);
                    console.log(prevRequest);
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);    
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;