import ApiRequest from './request';
import {baseURL} from './config';

const apiVersion = '';
const baseURL_V1 = baseURL + apiVersion;

const apiRequest = new ApiRequest();

apiRequest.axios.interceptors.request.use(
    (config: any) => {
        return Promise.resolve(config);
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

apiRequest.axios.interceptors.response.use(
    (data: any) => {
        return Promise.resolve(data);
    },
    (error: any) => {
        console.log(error);
        return Promise.reject(error);
    }
);


export class ApiServer {
    static getHistoryPrice = () => {
        return apiRequest.get(`${baseURL_V1}/price/get_history_price`, {});
    };

    static getConfig = () => {
        return apiRequest.get(`./project.config.json`, {});
    }
}
