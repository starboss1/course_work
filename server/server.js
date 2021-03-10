import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models/index.js';
import dbConfig from './app/config/db.config.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import documentRoutes from './app/routes/document.routes.js';

import shareDbMongo from 'sharedb-mongo'
import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import ShareDB from 'sharedb';
import richText from 'rich-text';

const app = express();
const server = http.createServer(app);

ShareDB.types.register(richText.type);

const documentDb = shareDbMongo(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.SHARE_DOCUMENTS_DB}`);
const shareDBServer = new ShareDB({ 'db': documentDb });
const connection = shareDBServer.connect()

const doc = connection.get('documents', 'firstDocument');

doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
        doc.create([{ insert: 'Hello World!' }], 'rich-text', () => {
            const wss = new WebSocket.Server({ server: server });
            wss.on('connection', (ws) => {
                const jsonStream = new WebSocketJSONStream(ws);
                shareDBServer.listen(jsonStream);
            });
        });
    }
    return;
});

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParsed: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connect to MongoDB.');
        initial();
    })
    .catch(err => {
        console.error('Connection error', err);
        process.exit();
    });

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome test app' });
});
authRoutes(app);
userRoutes(app);
documentRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT);
console.log(`Server is running on port ${PORT}`);

function initial () {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({ name: 'user' })
                .save(err => {
                    if (err) {
                        console.log('error', err);
                    }

                    console.log('added "user" to roles collection');
                });
        }
    });
}

// import WebSocket from 'ws';
// import WebSocketJSONStream from '@teamwork/websocket-json-stream';
// import ShareDB from 'sharedb';
// import richText from 'rich-text'

// /**
//  * By Default Sharedb uses JSON0 OT type.
//  * To Make it compatible with our quill editor.
//  * We are using this npm package called rich-text
//  * which is based on quill delta
//  */
// ShareDB.types.register(richText.type);

// const shareDBServer = new ShareDB();
// const connection = shareDBServer.connect();

// /**
//  * 'documents' is collection name(table name in sql terms)
//  * 'firstDocument' is the id of the document
//  */
// const doc = connection.get('documents', 'firstDocument');

// doc.fetch((err) => {
//     if(err) throw err;
//     if(doc.type === null){
//         /**
//          * If there is no document with id "firstDocument" in memory
//          * we are creating it and then starting up our ws server
//          */
//         doc.create([{insert: 'Hello World!'}], 'rich-text', () => {
//             const wss = new WebSocket.Server({port: 8080});

//             wss.on('connection', (ws) =>{
//                 // For transport we are using a ws JSON stream for communication
//                 // that can read and write js objects.
//                 const jsonStream = new WebSocketJSONStream(ws);
//                 shareDBServer.listen(jsonStream);
//             });
//         });
//     }
//     return;
// });
