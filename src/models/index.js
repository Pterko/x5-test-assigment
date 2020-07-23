const mongoose = require('mongoose');

const User = require('./user');
const Session = require('./session');

const MONGODB_URL =
  'mongodb://pterko:test550055@ds053972.mlab.com:53972/x5-test-assigment';

const connectDb = () => {
  return mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { User, Session };

module.exports.connectDb = connectDb;
module.exports.models = models;
