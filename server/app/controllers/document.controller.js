import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid'

const Document = db.document;
const User = db.user;

const createDocument = (req, res) => {
    const token = JSON.parse(req.headers['x-access-token']);
    User.findOne({ username: token.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }

            const document = new Document({
                documentId: uuidv4(),
                title: 'Title document',
                text: '',
                redactors: [user._id],
                owner: user._id
            });

            document.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({ message: 'Document was created successfully!' });
            })
        });
}

const deleteDocument = (req, res) => {
    const token = JSON.parse(req.headers['x-access-token']);
    const documentId = req.body.documentId;
    User.findOne({ username: token.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }

            Document.deleteOne({ documentId: documentId, owner: user._id })
                .exec((err, result) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: 'Document was deleted successfully!' });
                });
        });
}

export { createDocument, deleteDocument }
