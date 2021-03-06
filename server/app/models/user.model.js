import mongoose from 'mongoose';

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ],
        createdDocuments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Document'
            }
        ],
        redactedDocuments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Document'
            }
        ]
    })
);

export default User;
