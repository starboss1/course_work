import axios from 'axios';
import authHeader from './auth-header.js';
import { API_URL_TEST_USER, API_URL_USER_DOCUMENTS } from '../config.js'


const getUserBoard = () => {
    return axios.get(API_URL_TEST_USER, { headers: authHeader() });
}

const getUserDocuments = () => {
    return axios.get(API_URL_USER_DOCUMENTS, { headers: authHeader() });
}


export default { getUserBoard, getUserDocuments }
