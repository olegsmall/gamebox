const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: 'email' // not necessary, DEFAULT
  },
  function(username, password, done) {
    User.findOne({ email: username }, (err, user) => {
      console.log('authentification: ');
      console.log(err);
      console.log(user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
