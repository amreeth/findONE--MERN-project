import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://amreeth.online/api/'
});

export default axiosConfig