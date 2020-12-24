import axios from 'axios';
import User from './user';

class Axios {
    // 本地开发时使用的url
    // static _baseUrl = "http://localhost:8080/api/";
    // 部署时使用的请求服务器接口
    static _baseUrl = "http://39.104.84.48:8080/api/";
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