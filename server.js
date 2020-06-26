const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
const root = 'https://5ebd9842ec34e900161923e7.mockapi.io/post';

app.use(cors({
    methods: ['GET']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/post', function(req, res){
    axios.get(root).then(function(response){
        res.send(response.data);
    }).catch(function(error) {
        res.send(error);
    });
});

app.get('/comments/:id', function(req, res){
    const url = `${root}/${req.params.id}/comments`;

    axios.get(url).then(function(response){
        res.send(response.data);
    }).catch(function(error) {
        res.send(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
