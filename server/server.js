import express from 'express';
import bodyParser from 'body-parser';

const app = express(),
    port = 3080;

const users = [];

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
    console.log('/api/users called !!!')
    res.json(users);
});


app.post('/api/user', (req, res) => {
    const user = req.body.user;
    console.log('Adding user:::::::::', user);
    users.push(user);
    res.json('user added');
});


app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});