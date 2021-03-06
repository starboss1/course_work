import db from '../models/index.js';
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: 'Такий користувач вже існує' });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: 'Користувач з такою поштою вже існує' });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: `Роль ${req.body.roles[i]} не існує` });
                return;
            }
        }
    }
    next();
}

export { checkDuplicateUsernameOrEmail, checkRolesExisted }
