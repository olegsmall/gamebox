const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PriceSubSchema = new Schema({
  sell: Number,
  rent: Number
},{ _id : false });

// const RentSubSchema = new Schema({
//   from:  {type: Date, default: Date.now()},
//   to: {type: Date, required: [true, 'You should indicate end date of the rent']},
//   returned: Date,
//   holder: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Renter/holder id is required']}
// },{ _id : false });
//
// const SoldSubSchema = new Schema({
//   to_user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Buyer id is required']},
//   date: {type: Date, default: Date.now()}
// },{ _id : false });

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
  genres: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
  status: {
    type: [String],
    enum: ['for rent', 'for sale', 'rented', 'sold'],
    required: true,
    validate: [(value) => value.length > 0, 'Status should be indicated'],
  },
  esrb: {type: String, enum: ['e', 'e10', 't', 'm', 'a']},
  rating: [RatingSubSchema],
  price: PriceSubSchema,
  producer: String,
  // rented: [RentSubSchema],
  // sold: SoldSubSchema,
  added: {type: Date, default: Date.now()},
  edited: {type: Date}
});

ProductSchema.path('genres').validate(function(value) {
  return value.length;
},'At least one genre should be chosen');

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

