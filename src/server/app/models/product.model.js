/**
 * Created by: Peter Yablochkin
 * Created: 16 Sep 2018
 * Edited: 12 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Product Model Schema.
 * @module models/product.model
 * @requires mongoose
 * @requires mongoosePaginate
 */

const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PriceSubSchema = new Schema({
  sell: Number,
  rent: Number
},{ _id : false });

const RatingSubSchema = new Schema({
  mark: {
    type: Number,
    min: [1, 'Rating number should be between 1 and 5'],
    max: [5, 'Rating number should be between 1 and 5'],
    required: [true, 'Rating mark should be indicated']
  },
  rated_by: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Voter id is required']},
},{ _id : false });

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [4, 'Title should have at least 4 symbols'],
    maxlength: [40, 'Title maximum length is 40 symbols']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description minimum length is 10 symbols'],
  },
  images: [{
    type: String,
    required: false
  }],
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  genres: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
  status: {
    type: [String],
    enum: ['for rent', 'for sale', 'rented', 'sold'],
    required: true,
    validate: [(value) => value.length > 0, 'Status should be indicated'],
  },
  esrb: {type: String, enum: ['e', 'e10', 't', 'm', 'a']},
  rating: [RatingSubSchema],
  average_rating: {type: Number, default: 0},
  price: PriceSubSchema,
  producer: String,
  comment: [{
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type:String, minlength:10, maxlength:150},
    date: {type: Date, default: Date.now()}
  }],
  added: {type: Date, default: Date.now()},
  edited: {type: Date},
  rented_until: {type: Date}
});

ProductSchema.path('genres').validate(function(value) {
  return value.length;
},'At least one genre should be chosen');

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

