// Libs
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const compression = require('compression');
const fs = require('fs');
const cors = require('cors');

// Vars
const app = express();
const apiRoute = '/api';

// Routes import
const playerRoutes = require('./routes/player');

// Compression gzip
app.use(compression());

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Config Morgan logs
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs(
    'access.log', {
        interval: '1d',
        path: logDirectory
    }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Http headers
// CORS config
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.header('Allow', 'GET, POST, DELETE, PUT, OPTIONS');

    next();
});

app.options('*', cors());

// Routes
app.use(apiRoute, playerRoutes);

module.exports = app;