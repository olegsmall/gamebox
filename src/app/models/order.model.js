const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  status: {type: String, enum: ['pending', 'completed'], default: 'pending'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Buyer id is required']},
  payment_method: {type: String, enum: ['cash', 'check', 'paypal'], required: [true, 'Choose payment method']},
  opened: {type: Date, default: Date.now()},
  closed: {type: Date},
  transactions: [{
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product is required']},
    price: Number,
    rent_duration: Number,
    deal_type: {type: String, enum: ['for sale', 'for rent']},
    seller: String,
  }],
  total_items: Number,
  total_price: Number
});

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;