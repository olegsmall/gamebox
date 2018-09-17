const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');
// const jwt = require('jsonwebtoken');
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  avatar: {type: String},
  firstName: {type: String, required: true, max: 15},
  lastName: {type: String, required: true, max: 15}
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;
