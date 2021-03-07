import { verifyToken } from '../middlewares/index.js';
import * as controller from '../controllers/user.controller.js';

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/test/all', controller.allAccess);

    app.get('/api/test/user', [verifyToken], controller.userBoard);

    app.get('/api/getUserDocuments', [verifyToken], controller.userDocuments);
}
