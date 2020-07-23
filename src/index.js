const express = require('express');

const { connectDb } = require('./models');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/auth', routes.auth);
app.use('/hello', routes.hello);

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err);
});

connectDb().then(async () => {
  app.listen(4000, () => console.log(`Server is listening`));
});
