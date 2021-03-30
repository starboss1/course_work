import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models/index.js';
import dbConfig from './app/config/db.config.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import documentRoutes from './app/routes/document.routes.js';

import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import ShareDB from 'sharedb';
import richText from 'rich-text';

import { shareDBServer } from './serverShareDb.js'

const app = express();
const server = http.createServer(app);

ShareDB.types.register(richText.type);

const wss = new WebSocket.Server({ server: server });
wss.on('connection', (ws) => {
    const jsonStream = new WebSocketJSONStream(ws);
    shareDBServer.listen(jsonStream);
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

authRoutes(app);
userRoutes(app);
documentRoutes(app);

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
