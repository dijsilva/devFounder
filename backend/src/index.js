const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://dijsilva:dijsilva@cluster0-e3pi1.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use(express.json());
app.use(routes)

app.listen(3333);