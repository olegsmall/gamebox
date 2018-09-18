const { mongoose } = require('../../config/app.config');
// const mongoosePaginate = require('mongoose-paginate');
const passportLocalMongoose = require('passport-local-mongoose');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  avatar: {type: String},
  firstName: {type: String, required: true, max: 15},
  lastName: {type: String, required: true, max: 15}
});

UserSchema.plugin(passportLocalMongoose);
// UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;
