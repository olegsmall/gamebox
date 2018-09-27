const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PriceSubSchema = new Schema({
  sell: Number,
  rent: Number
},{ _id : false });

const RentSubSchema = new Schema({
  from:  Date,
  due_back: Date,
  to_user: {type: Schema.ObjectId, ref: 'User'}
},{ _id : false });

const SoldSubSchema = new Schema({
  date: Date,
  to_user: {type: Schema.ObjectId, ref: 'User'}
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
    minlength: [10, 'Description minimum lenght is 10 symbols'],
    maxlength: [500, 'Description maximum length is 500 symbols']
  },
  images: [{
    type: String,
    required: false
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // TO CHANGE
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  }],
  status: {
    type: [String],
    enum: ['for rent', 'for sale', 'rented', 'sold'],
    required: true,
    validate: [(value) => value.length > 0, 'Status should be indicated'],
  },

  price: PriceSubSchema,
  // rented: [RentSubSchema],
  // sold: [SoldSubSchema]
  added: {type: Date, default: Date.now()},
  edited: {type: Date}
});

ProductSchema.path('genres').validate(function(value) {
  return value.length;
},'At least one genre should be chosen');

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
