import mongoose from 'mongoose';

const Document = mongoose.model('Document',
    new mongoose.Schema({
        documentId: String,
        title: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        redactors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        text: String
    }));

export default Document
