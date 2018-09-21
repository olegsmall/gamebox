const { mongoose } = require('../../config/app.config');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {type: String, required: true, min: 3, max: 20, useCreateIndex: true},
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
