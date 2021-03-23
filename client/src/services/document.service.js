import axios from 'axios';
import { API_URL_ADD_USER_TO_DOCUMENT, API_URL_CHANGE_DOCUMENT_TITLE, API_URL_CREATE_DOCUMENT, API_URL_DELETE_DOCUMENT, API_URL_GET_DOCUMENT_INFO } from '../config.js';
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

const getDocumentInfo = (documentId) => {
    return axios.get(API_URL_GET_DOCUMENT_INFO + '/'+documentId, { headers: authHeader() });
}

const changeDocumentTitle = (documentId, newDocumentTitle) => {
    return axios.post(API_URL_CHANGE_DOCUMENT_TITLE, { documentId: documentId, newDocumentTitle: newDocumentTitle }, { headers: authHeader() });
}

export default { createDocument, deleteUserDocument, inviteUserToDocument, getDocumentInfo, changeDocumentTitle }
