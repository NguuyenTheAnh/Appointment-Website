import axios from 'axios';
import { toast } from 'react-toastify';
import { getNavigate } from '../services/navigateService';

const instance = axios.create({
    baseURL: 'http://localhost:4000/',
});

instance.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    // try {
    switch (status) {
        case 401: {
            const navigate = getNavigate();
            toast.error('Unauthorized the user. Please login');
            navigate('/login');
            return error.response.data;
        }
        case 403: {
            const navigate = getNavigate();
            toast.error(`You don't have permission`);
            navigate('/');
            return error.response.data;
        }
        case 400: {
            return error.response.data;
        }
        default: {
            return error.response.data;
        }
    }
    // } catch (error) {
    //     console.log(error);
    // }
});

export default instance;