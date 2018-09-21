const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  sell: Number,
  rent: Number
},{ _id : false });

const RentSchema = new Schema({
  from:  Date,
  due_back: Date,
  to_user: {type: Schema.ObjectId, ref: 'User'}
},{ _id : false });

const SoldSchema = new Schema({
  date: Date,
  to_user: {type: Schema.ObjectId, ref: 'User'}
},{ _id : false });

const ProductSchema = new Schema({
  title: {type: String, required: true, min: 4, max: 40},
  description: {type: String, required: true, min: 20},
  images: [{type: String, required: false}],
  // owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  genre: [{type: Schema.ObjectId, ref: 'Genre', required: true}],
  price: [PriceSchema],
  status: [{type: String, enum: ['For rent', 'For sale', 'Rented', 'Sold'], required: true}],
  rented: [RentSchema],
  sold: [SoldSchema]
});

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
