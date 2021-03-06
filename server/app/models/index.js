import mongoose from 'mongoose';
import userModel from './user.model.js';
import roleModel from './role.model.js';
import documentModel from './document.model.js';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = userModel;
db.role = roleModel;
db.document = documentModel;

db.ROLES = ['user'];

export default db;
