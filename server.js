const express = require('express');
//const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
const root = 'https://5ebd9842ec34e900161923e7.mockapi.io/post';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/post', function (req, res) {
    return res.send(root);
});

app.get('/comments/:id', function (req, res) {
    const url = `${root}/${req.params.id}/comments`;
    return res.send(url);
});

app.listen(port);