/**
 * Created by: Peter Yablochkin
 * Created: 04 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Genre Model Schema.
 * @module models/genre.model
 * @requires mongoose
 */

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
