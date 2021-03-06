import axios from 'axios';
import { API_URL_SIGNIN, API_URL_SIGNUP } from '../config.js'

const register = (username, email, password) => {
    return axios.post(API_URL_SIGNUP, { username, email, password });
}

const login = (username, password) => {
    return axios
        .post(API_URL_SIGNIN, { username, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem('user');
}

export default { register, login, logout }

