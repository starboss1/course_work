import axios from 'axios';
import { API_URL_ADD_USER_TO_DOCUMENT, API_URL_CREATE_DOCUMENT, API_URL_DELETE_DOCUMENT, API_URL_GET_DOCUMENT_REDACTORS } from '../config.js';
import authHeader from './auth-header.js';

const createDocument = () => {
    return axios.post(API_URL_CREATE_DOCUMENT, {}, { headers: authHeader() } );
}

const deleteUserDocument = (documentId) => {
    return axios.delete(API_URL_DELETE_DOCUMENT+'/'+documentId, { headers: authHeader() });
}

const inviteUserToDocument = (documentId, userEmail) => {
    return axios.post(API_URL_ADD_USER_TO_DOCUMENT, { documentId: documentId, userEmail: userEmail }, { headers: authHeader() });
}

const getDocumentRedactors = (documentId) => {
    return axios.get(API_URL_GET_DOCUMENT_REDACTORS + '/'+documentId, { headers: authHeader() });
}

export default { createDocument, deleteUserDocument, inviteUserToDocument, getDocumentRedactors }
