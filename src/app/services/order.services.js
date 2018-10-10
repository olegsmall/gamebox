const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');


exports.placeOrder = function (req) {
  console.log(req.body.payment_method);
  if(req.body.payment_method !== 'cash' && req.body.payment_method !== 'check' && req.body.payment_method !== 'paypal') {
    throw Error('Unsupported payment method. Accepted payment methods are: PayPal, Cash, Check!');
  }
  try {
    // console.log(req.);
    let order = new Order({
      status: 'pending',
      buyer: req.user._id,
      payment_method: req.body.payment_method,
      opened: Date.now()
    });

    let products = User.findById(req.user._id).populate('cart.product');

    return products.then((user, err) => {
      if(err) {throw Error(err);}
      if(user.cart.length < 1) { throw Error('Your cart is empty. Nothing to order!'); }

      let transaction = [],
        total_price = 0,
        total_items = 0;

      // Loop throw product in the cart and gather info for order
      for(let i=0; i < user.cart.length; i++) {
        let pre_order_info = {
          product: user.cart[i].product._id,
          seller: user.cart[i].product.owner,
          deal_type: user.cart[i].deal_type
        };
        // Check deal type to assign right price
        if(user.cart[i].deal_type === 'for rent') {
          pre_order_info.price = user.cart[i].product.price.rent; // rent price
          pre_order_info.rent_duration = user.cart[i].rent_duration; // rent duration
          total_price += pre_order_info.price * pre_order_info.rent_duration; // calculate & add total price for rent

          let date = new Date();
          Product.updateOne({_id: user.cart[i].product}, {$set : {rented_until: date.addDays(user.cart[i].rent_duration)}}).exec();

        } else {
          pre_order_info.price = user.cart[i].product.price.sell; // selling price
          total_price += pre_order_info.price; // add selling price to the total
        }
        total_items++;
        transaction.push(pre_order_info); // push item to transaction object

        // Update product status
        let status = []; // create a buffer for product status
        if(user.cart[i].deal_type === 'for rent') {  // If user chose to rent the product
          status = ['rented']; // change product.status to 'Rented'
        } else { // Otherwise
          status = ['sold']; // change product.status to 'Sold'
        }
        // Execute query for status changes

        Product.updateOne({_id: user.cart[i].product}, {$set : {status: status}}).exec();
      }

      // assigning info fields to the order
      order.transactions = transaction;
      order.total_items = total_items;
      order.total_price = total_price;

      User.updateOne({_id: order.buyer}, {$set: {cart: []}}).exec(); // Empty user's cart

      return order.save().then((res) => { //saving and returning order
        // return created order & prepared info for paypal payment
        return {order: res, transactions: preparePaymentInfo(user.cart)};
      });
    });
  } catch (e) {
    throw {error: e, message: 'Order creation error'};
  }
};

exports.getOrders = function (req) {
  let queryOptions = {}; // Mongoose-paginator query options
  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects

  try {
    return Order.paginate({}, queryOptions).then((orders) => {
      if(orders === null) { throw Error('No orders found'); }
      return orders;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

exports.getOrder = function (req) {
  try {
    return Order.findById(req.params.id).then((order) => {
      if(order === null) { throw Error('Order not found'); }
      return order;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};


exports.paymentExecute = function (req) {
  try {
    return Order.findById(req.params.id).then((order, err) => {
      if(err) { throw err; }
      if(order === null) { throw Error('Order not found'); }

      return {
        payer_id: req.query.PayerID,
        transactions: [{
          amount: {
            currency: 'USD',
            total: order.total_price
          }
        }]
      };
    });
  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

exports.completeOrder = function (id) {
  try {
    // Find order in DB
    return Order.findById(id).then((order, err) => {
      if(err) {throw Error(err);} // Show error in case
      order.status = 'completed'; // change order status to 'completed'
      return order.save() // Save order in DB
    });
  } catch (e) {
    throw Error('Error at Order Complete');
  }
};

function preparePaymentInfo (cart) {
  let item_list = [],
    total_price = 0;

  for (let i = 0; i < cart.length; i++) {
    // Item list info
    let item = {
      name: cart[i].product.title,
      sku: cart[i].product._id,
      currency: 'USD',
      quantity: 1
    };

    // If rent
    if (cart[i].deal_type === 'for rent') {
      item.price = cart[i].product.price.rent * cart[i].rent_duration; // Add rent price
      total_price += cart[i].product.price.rent * cart[i].rent_duration;
      // If sell
    } else {
      item.price = cart[i].product.price.sell;
      total_price += item.price;
    }
    //Form item_list
    item_list.push(item);
  }

  return [{
    item_list: {
      items: item_list,
    },
    amount: {
      currency: 'USD',
      total: total_price,
    },
    description: 'Payment for gamebox services'
  }];
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};