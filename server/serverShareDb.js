import shareDbMongo from 'sharedb-mongo';
import dbConfig from './app/config/db.config.js';
import ShareDB from 'sharedb';

export const documentDb = shareDbMongo(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.SHARE_DOCUMENTS_DB}`);
export const shareDBServer = new ShareDB({ 'db': documentDb });

export const createShareDbDocument = (documentId) => {
    const connection = shareDBServer.connect();
    const doc = connection.get('documents', documentId);
    doc.fetch((err) => {
        if (err) throw err;
        if (doc.type === null) {
            doc.create([{ insert: 'Hello World!' }], 'rich-text', () => {
                console.log('Created shareDB document ' + documentId);
            })
        }
    })
}
