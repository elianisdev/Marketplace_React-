import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});