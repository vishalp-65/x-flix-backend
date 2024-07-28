const express = require('express')
const {errorHandler} = require('./middlewares')
const v1Route = require('./routes/v1')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/v1', v1Route);

app.use(errorHandler);

module.exports = app;