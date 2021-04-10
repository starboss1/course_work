import jwt from 'jsonwebtoken';
import * as config from '../config/auth.config.js';

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'Відсутній токен авторизації' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Неавторизований' });
        }
        req.userId = decoded.id;
        next();
    });
}

export { verifyToken }
