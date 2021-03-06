import db from '../models/index.js';

const User = db.user;
const Document = db.document;

export const allAccess = (req, res) => {
    res.status(200).send('Public Content');
};

export const userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

export const userDocuments = (req, res) => {
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

            Document.find({ owner: user._id }, 'documentId title', {},
                (err, documents) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ documents: documents });
                }
            );
        });
}
