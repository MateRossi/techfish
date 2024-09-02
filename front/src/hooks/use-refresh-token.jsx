import axios from "../api/axios";
import useAuth from "./use-auth";
import * as jose from 'jose';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        const accessToken = response?.data?.accessToken;
        const decodedToken = jose.decodeJwt(accessToken);

        console.log("decoded token in refresh hook", decodedToken);
        console.log(`Id: ${decodedToken.UserInfo.id}\nRole: ${decodedToken.UserInfo.role}\nToken: ${response.data.accessToken} `)
        setAuth(prev => {
            return {
                ...prev,
                id: decodedToken.UserInfo.id,
                role: decodedToken.UserInfo.role,
                name: decodedToken.UserInfo.name,
                accessToken: response.data.accessToken,
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;