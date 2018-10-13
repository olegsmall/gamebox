/**
 * Created by: Oleg Smolovik
 * Created: 15 Sep 2018
 *
 * @fileoverview Treats received data and executes DataBase CRUD queries for orders.
 * @module passport/index
 * @requires passport
 * @requires LocalStrategy
 * @requires models/user.model
 */

const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user.model');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  User.findById( id,
    (err, user) => {
      done(err, user);
    }
  );
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
