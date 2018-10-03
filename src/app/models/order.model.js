const { mongoose } = require('../../config/app.config');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  status: {type: String, enum: ['pending', 'completed'], default: 'pending'},
  buyer: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Buyer id is required']},
  payment_method: {type: String, enum: ['cash', 'check', 'paypal'], required: [true, 'Choose payment method']},
  date: {type: Date, default: Date.now()},
  transaction: [{
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product is required']},
    price: Number,
    type: {type: String, enum: ['sell', 'rent']},
    seller: String,
    date: {type: Date, default: Date.now()}
  }]
});

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;