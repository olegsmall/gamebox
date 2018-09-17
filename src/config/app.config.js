const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';
export const logStars = function (message) {
  console.info('************');
  console.info(message);
  console.info('************');
};

export const publicDir = 'public';

export const port = env.PORT || 8080;


// Database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gamebox', { useNewUrlParser: true });
export { mongoose };



