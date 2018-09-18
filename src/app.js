import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hanlebars from 'express-handlebars';
const passport = require('passport');

// import path from 'path';
import {publicDir, port} from './config/app.config';

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

//Allow serving static files from public (publicDir) folder
app.use(express.static(publicDir));


app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/*
* body-parser extracts the entire body portion of an incoming request and assigns it to req.body.
* Parses the body text as URL encoded data (which is how browsers send form data from forms with method set.....
* and exposes the resulting object (containing the keys and values) on req.body
* */
app.use(bodyParser.urlencoded({extended: true}));
//If the body of incoming request is a json object then assign it to req.body property
app.use(bodyParser.json());

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
app.set('view engine', 'ejs');

// Set the Location of the view templates
app.set('views', __dirname + '/app/views');

// Mount the routs to the app
app.use('/', require('./app/routes/index.route'));
app.use('/user', require('./app/routes/user.route'));
app.use('/admin', require('./app/routes/admin.route'));

app.listen(port, () =>{
  console.info('Express listening on port ', port);
});
