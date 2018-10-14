/**
 * Created by: Peter Yablochkin
 * Created: 05 Sept 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Article Model Schema.
 * @module models/article.model
 * @requires mongoose, mongoosePaginate
 */

const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [4, 'Title should have at least 4 symbols'],
    maxlength: [40, 'Title maximum length is 40 symbols']
  },
  content: {
    type: String,
    required: true,
    minlength: [10, 'Content minimum lenght is 10 symbols']
  },
  comment: [{
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type:String, minlength:10, maxlength:150},
    date: {type: Date, default: Date.now()}
  }],
  image: {type: String, required: false},
  tags: [String],
  created: {type: Date, default: Date.now},
  edited: {type: Date}
});

ArticleSchema.plugin(mongoosePaginate);
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
