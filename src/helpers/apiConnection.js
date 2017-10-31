import axios from 'axios';
import { apiUrl, httpAuth } from '@/../env';
import { getHeader } from '@/auth/config';

class Api {
    constructor() {
        this.resource = axios.create({
            baseURL: apiUrl,
            // withCredentials: true,
            // auth: httpAuth,
        });
    }
    get(route, params = {}) {
        return this.resource.get(route, params);
    }
    post(route, params = {}) {
        return this.resource.post(route, params);
    }
    cancelTokenProcess(params) {
        if (this.cancel !== null) {
            this.cancel();
        }
        return Object.assign(params, {
            cancelToken: new this.CancelToken((c) => {
                // An executor function receives a cancel function as a parameter
                this.cancel = c;
            }),
        });
    }
}

export default new Api();
