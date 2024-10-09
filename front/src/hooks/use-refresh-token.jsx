import axios from "../api/axios";
import useAuth from "./use-auth";

function useRefreshToken() {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        
        setAuth(prev => {            
            return {
                ...prev,
                id: response.data.id,
                role: response.data.role,
                name: response.data.name,
                accessToken: response.data.accessToken,
            }
        });

        return {
            accessToken: response.data.accessToken,
            id: response.data.id,
        };
    }

    return refresh;
}

export default useRefreshToken;