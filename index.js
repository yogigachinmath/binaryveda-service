require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./errorHandler');

const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/signUp');

const uri = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/sign', signUpRouter);

app.get('/', async (req, res) => {
  res.status(200).send('welcome');
});

app.use(errorHandler);

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('connected to db'));

app.listen(process.env.PORT || 5000, () => {
  console.log('server listening on port 5000');
});

module.exports = app;
