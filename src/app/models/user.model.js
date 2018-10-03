const {mongoose} = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');
import bcrypt from 'bcryptjs';


const RatingSubSchema = new mongoose.Schema({
  mark: {
    type: Number,
    min: [1, 'Rating number should be between 1 and 5'],
    max: [5, 'Rating number should be between 1 and 5'],
    required: [true, 'Rating mark should be indicated']
  },
  rated_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Voter id is required']},
},{ _id : false });

const StatusSubSchema = new mongoose.Schema({
  state: {type: String, enum: ['activated', 'deactivated', 'banned'], default: 'deactivated'},
  expires: {type: Date}
},{ _id : false });



const UserSchema = new mongoose.Schema({
  firstName: {type: String, required: [true, 'Firstname is required'], minlength: 3, maxlength: 30},
  lastName: {type: String, required: false, minlength: 3, maxlength: 30, default: ''},
  email: {
    type: String,
    required: [true, 'Email is required'],
    useCreateIndex: true,
    match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Please fill a valid email address']
  },
  avatar: {type: String, default: '/image/default/default_avatar.png'},
  role: {type: String, enum: ['SuperUser', 'Administrator', 'User'], default: 'User'},
  status: StatusSubSchema,
  phone: {type: String},
  address: {type: String, minlength: 5, maxlength: 50},
  password: {type: String, minlength: 1},
  rating: [RatingSubSchema],
  creation_date: {type: Date, default: Date.now()}
});

UserSchema.plugin(mongoosePaginate);

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
