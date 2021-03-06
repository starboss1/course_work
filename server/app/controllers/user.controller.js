import db from '../models/index.js';

const User = db.user;
const Document = db.document;

export const allAccess = (req, res) => {
    res.status(200).send('Common test content');
};

export const userBoard = (req, res) => {
    res.status(200).send('Some user test content');
};

export const userDocuments = (req, res) => {
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

            Document.find({ owner: user._id }, 'documentId title', {},
                (err, documents) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    Document.find({ redactors: user._id }, 'documentId title', {},
                        (err, redactedDoc) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.send({ ownerDocuments: documents, redactorDocuments: redactedDoc });
                        });
                }
            );
        });
}
