const { mongoose } = require('../../config/app.config');
// const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {type: String, required: true, min: 4, max: 40},
  description: {type: String, required: true, min: 20},
  images: [String],
  owner: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
  genre: [{type: Schema.ObjectId, ref: 'Genre', required: true}],
  price: [{type: Number}],
  status: {type: String, enum: ['For rent', 'For sale', 'Rented', 'Sold']},
  rented: [
    {from:  {type: Date}},
    {due_back: {type: Date, default: Date.now}},
    {to_user: {type: Schema.ObjectId, ref: 'User', required: false}}
  ],
  sold: [
    {date: {type: Date}},
    {to_user: {type: Schema.ObjectId, ref: 'User'}}
  ]
});

// Virtual for this book instance URL.
ProductSchema
  .virtual('url')
  .get(function () {
    return '/catalog/products/' + this._id;
  });

// UserSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
