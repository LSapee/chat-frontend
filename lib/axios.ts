import axios from 'axios';

export const axiosInstanace = axios.create({
    baseURL:"https://chatapi.lsapee.com/api",
    withCredentials: true,
})