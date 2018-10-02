const OrderService = require('../services/order.services');

exports.createOrder = async function(req, res) {
  try {
    if (req.user){
      let newOrder = await OrderService.createOrder(req);
      return res.status(201).json({status: 201, article: newOrder, message: 'Order created successfully'});
    } else {
      return res.status(403.21).json({status: 403.21, message: 'Source access denied'});
    }
  }catch(e){
    return res.status(400).json({status: 400, error: e.message, message: 'Order was not created'});
  }
};

exports.getOrders = async function(req, res) {
  try {
    let orders = await OrderService.getOrders(req);
    // Return the orders list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, orders: orders, message: 'Orders received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createTransaction = async function(req, res) {
  try {
    let transaction = await OrderService.getOrders(req);
    // Return the transaction list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, transaction: transaction, message: 'Orders received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getTransactions = async function(req, res) {
  try {
    let transaction = await OrderService.getOrders(req);
    // Return the transaction list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, transaction: transaction, message: 'Orders received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

