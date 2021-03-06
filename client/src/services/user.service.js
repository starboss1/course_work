import axios from 'axios';
import authHeader from './auth-header.js';
import { API_URL_TEST_ALL, API_URL_TEST_USER } from '../config.js'


const getPublicContent = () => {
    return axios.get(API_URL_TEST_ALL);
}

const getUserBoard = () => {
    return axios.get(API_URL_TEST_USER, { headers: authHeader() });
}


export default { getPublicContent, getUserBoard }
