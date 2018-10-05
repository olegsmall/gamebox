const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.createOrder = function (req) {
  try {
    let order = new Order({
      status: 'pending',
      buyer: req.user._id,
      payment_method: req.body.payment_method,
      opened: Date.now()
    });

    let products = User.findById(req.user._id).populate('cart.product');
    return products.then((user, err) => {
      if(err) {throw err;}
      let transaction = [],
        total_price = 0,
        total_items = 0;
      for(let i=0; i < user.cart.length; i++) {
        let pre_order_info = {
          product: user.cart[i].product._id,
          seller: user.cart[i].product.owner,
          deal_type: user.cart[i].deal_type
        };
        if(user.cart[i].deal_type === 'for rent') {
          pre_order_info.price = user.cart[i].product.price.rent;
          pre_order_info.rent_duration = user.cart[i].rent_duration;
          total_price += pre_order_info.price * pre_order_info.rent_duration;
        } else {
          pre_order_info.price = user.cart[i].product.price.sell;
          total_price += pre_order_info.price;
        }
        total_items++;
        transaction.push(pre_order_info);
      }
      order.transaction = transaction;
      order.total_items = total_items;
      order.total_price = total_price;
      // console.log('order', order);
      return order.save();
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
