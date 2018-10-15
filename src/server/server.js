import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from './app/passport';
// import MongoStore from 'connect-mongo'(session);
const MongoStore = require('connect-mongo')(session);

import {publicDir, port, mongoose} from './config/app.config';

const app = express();

app.use(morgan('dev'));

/*
* body-parser extracts the entire body portion of an incoming request and assigns it to req.body.
* */
app.use(bodyParser.urlencoded({extended: true}));
//If the body of incoming request is a json object then assign it to req.body property
app.use(bodyParser.json());

//Allow serving static files from public (publicDir) folder
app.use(express.static(publicDir));


app.use(
  session({
    secret: 'krjoooe-ttlldj',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);

app.use( (req, res, next) => {
  // console.log('req.session', req.session);
  return next();
});

//Passport
app.use(passport.initialize());
app.use(passport.session());

/*
* Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
*/
app.use(cookieParser());

// Mount the routs to the app
app.use('/', require('./app/routes/index.route'));
app.use('/user', require('./app/routes/user.route'));
app.use('/admin', require('./app/routes/admin.route'));
app.use('/genre', require('./app/routes/genre.route'));
app.use('/product', require('./app/routes/product.route'));
app.use('/article', require('./app/routes/article.route'));
app.use('/cart', require('./app/routes/cart.route'));
app.use('/order', require('./app/routes/order.route'));
app.use('/message', require('./app/routes/message.route'));

app.listen(port, () =>{
  console.info('Express listening on port ', port);
});
