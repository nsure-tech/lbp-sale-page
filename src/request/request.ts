import axios from 'axios';
class ApiRequest {
    /**
     * axios 实例
     */
    public axios:any;

    /**
     * 构造函数
     */
    constructor() {
        this.axios = axios.create({
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            transformRequest: [
                (data) => {
                    return JSON.stringify(data);
                }
            ],
            transformResponse: [
                (data) => {
                    return JSON.parse(data);
                }
            ]
        });
        this.interceptors();
    }

    /**
     * 默认拦截器
     */
    interceptors() {
        // 请求拦截器
        this.axios.interceptors.request.use(
            (config: any) => {
                // if (localStorage.getItem('token')) {
                //     config.headers.common['token'] = localStorage.getItem('token');
                // }
                return Promise.resolve(config);
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.axios.interceptors.response.use(
            (response: { status: any; data: any; }) => {
                const { status, data } = response;
                // const { code, result } = data;
                // if (status === 200 && code === 0) {
                //     return Promise.resolve(result);
                // }
                return Promise.resolve(data);
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
    }

    get(url: string, params: any) {
        return this.axios.get(url, { params: { ...params } });
    }

    post(url: any, data: any) {
        return this.axios.post(url, data);
    }

    put(url: any, data: any) {
        return this.axios.put(url, data);
    }

    patch(url: any, data: any) {
        return this.axios.patch(url, data);
    }

    delete(url: any) {
        return this.axios.delete(url);
    }
}

export default ApiRequest;
