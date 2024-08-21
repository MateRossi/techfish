import axios from "axios";
const BASE_URL = 'https://techfish.vercel.app';
const LOCAL = 'http://localhost:3500';

export default axios.create({
    baseURL: LOCAL
});

export const axiosPrivate = axios.create({
    baseURL: LOCAL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});