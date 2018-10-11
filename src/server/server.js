import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from './app/passport';
// import MongoStore from 'connect-mongo'(session);
const MongoStore = require('connect-mongo')(session);

// import path from 'path';
import {publicDir, port, mongoose} from './config/app.config';

// import style from 'clientReact/css/main.scss';

const app = express();

// //Middleware for compilling sass to css
// app.use(sassMiddleware({
//   /* Options */
//   src: 'clientReact/scss',
//   dest: 'public',
//   debug: true,
//   outputStyle: 'compressed',
//   // prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
//
//   // src: path.join(__dirname, 'clientReact/scss'),
//   // dest: path.join(__dirname, 'public/css')
// }));

app.use(morgan('dev'));

/*
* body-parser extracts the entire body portion of an incoming request and assigns it to req.body.
* Parses the body text as URL encoded data (which is how browsers send form data from forms with method set.....
* and exposes the resulting object (containing the keys and values) on req.body
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
* Optionally you may enable signed cookie support by passing a secret string,
* which assigns req.secret so it may be used by other middleware.
*/
app.use(cookieParser());

/*
* Configure handlebars:
* set extension to .hbs so handlebars knows what to look for
* set the defaultLayout to 'main' so that all partial templates will be rendered and inserted in the main's ....
* the main.hbs defines define page elements such as the menu and imports all the common css and javascript ...
*/

// Register handlebars as the view engine to be used to render the templates
// app.set('view engine', 'ejs');

// Set the Location of the view templates
// app.set('views', __dirname + '/app/views');

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
