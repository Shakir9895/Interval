
import axios from 'axios';

const BASE_URL =  "http://localhost:5001";

const axiosInstance = axios.create({baseURL: BASE_URL});

export default axiosInstance;