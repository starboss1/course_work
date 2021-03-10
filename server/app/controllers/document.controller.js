import db from '../models/index.js';
import { v4 as uuidv4 } from 'uuid'
import { createShareDbDocument } from '../../serverShareDb.js';

const Document = db.document;
const User = db.user;

const createDocument = (req, res) => {
    const token = JSON.parse(
        Buffer.from(req.headers['x-access-token'].split('.')[1], 'base64').toString('ascii')
    );
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
                createShareDbDocument('' + document.documentId);
                res.send({ message: 'Document was created successfully!' });
            })
        });
}

const deleteDocument = (req, res) => {
    const token = JSON.parse(
        Buffer.from(req.headers['x-access-token'].split('.')[1], 'base64').toString('ascii')
    );
    const documentId = req.params.documentId;
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

const getDocumentRedactors = (req, res) => {
    const documentId = req.params.documentId;
    Document.findOne({ documentId: documentId })
        .exec((err, document) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!document) {
                res.status(404).send({ message: 'Document not found.' });
                return;
            }

            User.find({ _id: { $in: document.redactors } }, 'username', {},
                (err, users) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ documentRedactors: users });
                })
        })
}

const inviteUserToDocument = (req, res) => {
    const documentId = req.body.documentId;
    const userEmail = req.body.userEmail;
    const token = JSON.parse(
        Buffer.from(req.headers['x-access-token'].split('.')[1], 'base64').toString('ascii')
    );

    User.findOne({ username: token.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }

            User.findOne({ email: userEmail })
                .exec((err, inviteUser) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (!inviteUser) {
                        return res.status(404).send({ message: 'User with email ' + userEmail + ' not found.' });
                    }

                    Document.findOne({ documentId: documentId, owner: user._id })
                        .exec((err, docToModify) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            if (!docToModify) {
                                res.status(404).send({ message: 'Document not found' });
                                return;
                            }

                            inviteUser.redactedDocuments.push(docToModify._id);
                            docToModify.redactors.push(inviteUser._id);

                            inviteUser.save();
                            docToModify.save();

                            res.send({ message: 'User invited to document successfully' });
                        });
                });
        });
}

export { createDocument, deleteDocument, inviteUserToDocument, getDocumentRedactors }
