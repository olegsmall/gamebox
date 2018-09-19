const {mongoose} = require('../../config/app.config');
// const mongoosePaginate = require('mongoose-paginate');
// const passportLocalMongoose = require('passport-local-mongoose');
import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: false},
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {type: String},
  address: {type: String},
  password: {type: String},
});

// UserSchema.plugin(passportLocalMongoose);
// UserSchema.plugin(mongoosePaginate);
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword(plaintTextPassword){
    return bcrypt.hashSync(plaintTextPassword, 10);
  }
};

UserSchema.pre('save', function(next) {
  console.log('saving');
  if (!this.password) {
    console.log('models/user.model.js ---- No password provided ----');
    next();
  } else {
    console.log('models/user.model.js hashPassword in pre save');
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
