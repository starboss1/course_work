import mongoose from 'mongoose';
import userModel from './user.model.js';
import roleModel from './role.model.js';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = userModel;
db.role = roleModel;

db.ROLES = ['user'];

export default db;
