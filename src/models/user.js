const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  return user;
};

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.filterSystemFields = function () {
  let obj = this.toObject();

  delete obj.password;
  delete obj.__v;

  return obj;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
