import { verifyToken } from '../middlewares/index.js';
import * as controller from '../controllers/document.controller.js';

export default (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post('/api/createDocument', [verifyToken], controller.createDocument);
    app.delete('/api/deleteDocument/:documentId', [verifyToken], controller.deleteDocument);
    app.post('/api/inviteUser', [verifyToken], controller.inviteUserToDocument);
    app.get('/api/documentInfo/:documentId', [verifyToken], controller.getDocumentInfo);
    app.post('/api/changeDocumentTitle', [verifyToken], controller.changeDocumentTitle)
}
