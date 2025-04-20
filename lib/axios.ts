import axios from 'axios';

export const axiosInstanace = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
})