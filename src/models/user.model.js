const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: {
      require: true,
      unique: true,
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    email: {
      type: String,
      default: 'example@gmail.com',
    },
    avatar: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    ig: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    idCard: {
      type: Number,
      unique: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('users', userSchema);
