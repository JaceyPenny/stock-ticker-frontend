let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var port = process.env.PORT || 8080;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/login', (req, res) => {
    if (!req.body) {
        console.log(req.body);
        res.status(400).send();
        return;
    }

    const username = process.env.STOCK_TICKER_USER;
    const password = process.env.STOCK_TICKER_PASS;

    if (req.body.username !== username || req.body.password !== password) {
        res.status(401).send();
        return;
    }

    const mashapeKey = process.env.MASHAPE_KEY;

    res.status(200).json({
        mashapeKey: mashapeKey
    });
})

console.log('environment: ' + process.env.NODE_ENV);

let server = app.listen(port, () => {
    let address = server.address().address;
    let port = server.address().port;

    console.log('App now running on ' + address + ':' + port);
});
