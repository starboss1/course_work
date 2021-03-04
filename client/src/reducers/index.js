import { combineReducers } from 'redux';

import auth from './auth.js';
import message from './message.js';

export default combineReducers({
    auth,
    message
});