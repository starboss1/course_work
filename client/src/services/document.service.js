import axios from 'axios';
import { API_URL_CREATE_DOCUMENT, API_URL_DELETE_DOCUMENT } from '../config.js';
import authHeader from './auth-header.js';

const createDocument = () => {
    return axios.post(API_URL_CREATE_DOCUMENT, {}, { headers: authHeader() } );
}

const deleteUserDocument = (documentId) => {
    return axios.delete(API_URL_DELETE_DOCUMENT+'/'+documentId, { headers: authHeader() });
}

export default { createDocument, deleteUserDocument }
