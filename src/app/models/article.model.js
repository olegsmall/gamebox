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
    minlength: [10, 'Content minimum lenght is 10 symbols'],
    maxlength: [1500, 'Content maximum length is 1500 symbols']
  },
  images: {type: [String], required: false},
  video: {type: [String], required: false},
  tags: [String],
  created: {type: Date, default: Date.now},
  edited: {type: Date}
});

ArticleSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Article', ArticleSchema);

module.exports = Product;
