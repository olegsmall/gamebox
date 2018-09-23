const { mongoose } = require('../../config/app.config');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    useCreateIndex: true
  },
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;
