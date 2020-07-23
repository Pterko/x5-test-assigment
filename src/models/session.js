const mongoose = require('mongoose');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const SessionSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

SessionSchema.statics.findSession = function (session) {
  return this.findOne({ accessToken: session }).populate('user');
};

SessionSchema.statics.createSession = function (user, cb) {
  const today = moment();
  const tomorrow = moment(today).add(1, 'days');

  let newSession = new this({
    accessToken: uuidv4(),
    user: user._id,
    expiresAt: tomorrow.toISOString(),
  });

  return newSession;
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
