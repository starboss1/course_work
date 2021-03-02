import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import ShareDB from 'sharedb';
import richText from 'rich-text'


ShareDB.types.register(richText.type);

const shareDBServer = new ShareDB();
const connection = shareDBServer.connect();

const doc = connection.get('documents', 'firstDocument');

doc.fetch((err) => {
    if(err) throw err;
    if(doc.type === null){
        doc.create([{insert: 'Hello World!'}], 'rich-text', () => {
            const wss = new WebSocket.Server({port: 8080});

            wss.on('connection', (ws) =>{
                const jsonStream = new WebSocketJSONStream(ws);
                shareDBServer.listen(jsonStream);
            });
        });
    }
    return;
});

// import express from 'express';
// import bodyParser from 'body-parser';

// const app = express(),
//     port = 3080;

// const users = [];

// app.use(bodyParser.json());

// app.get('/api/users', (req, res) => {
//     console.log('/api/users called !!!')
//     res.json(users);
// });


// app.post('/api/user', (req, res) => {
//     const user = req.body.user;
//     console.log('Adding user:::::::::', user);
//     users.push(user);
//     res.json('user added');
// });


// app.get('/', (req,res) => {
//     res.send('App Works !!!!');
// });

// app.listen(port, () => {
//     console.log(`Server listening on the port::${port}`);
// });