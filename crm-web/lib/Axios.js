import axios from 'axios';
import User from './user';

class Axios {
    static _baseUrl = "http://localhost:8080/api/";
    static init() {
        const config = {
            withCredentials: true,
            baseURL: Axios._baseUrl,
        };
        if (typeof window !== 'undefined') {
            const token = User.getToken();
            config.headers = { token };
        }
        return axios.create(config);
    }

    
}

export default Axios;