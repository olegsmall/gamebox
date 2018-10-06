const OrderService = require('../services/order.services');
const paypal = require('paypal-rest-sdk');


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcpyaszloX0COQAbRdPXQiu5e5pJ8WRHZm3C6WKHkTvYI0CTCXj5Ca2AcbcX0DdA25689MRm2zM9hia5',
  'client_secret': 'EJTnZz1fmv2i3pqfU8PclkqTwVAScmkYTtQpsmSIfVQGXWTRbJYNXH1iovolWNCojsmy0pmDRQSHSUMD'
});


exports.createOrder = async function(req, res) {

  try {
    let order = await OrderService.createOrder(req);

    let order_payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:8080/order/' + order.order._id + '/payment',
        cancel_url: 'http://localhost:8080/cart'
      },
      transactions: order.transactions
    };

    // return res.status(201).json({status: 201, order: order_payment, message: 'Order created successfully'});

    paypal.payment.create(order_payment, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for(let i=0; i<payment.links.length; i++) {
          if(payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });

  }catch(e){
    return res.status(400).json({status: 400, error: e.message, message: 'Order was not created'});
  }
};


exports.paymentExecute = async function(req, res) {
  try {
    let payment_info = await OrderService.paymentExecute(req);

    paypal.payment.execute(req.query.paymentId, payment_info, (error, payment) => {
      if (error) { throw error; }
      return OrderService.updateOrderStatus(req.params.id, 'completed').then((order) => {
        return res.status(200).json({status: 200, order: order, message: 'Order received'});
      });

    });

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
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

exports.getOrder = async function(req, res) {
  try {
    let order = await OrderService.getOrder(req);
    // Return the orders list with the appropriate HTTP Status Code and Message.
    return res.status(200).json({status: 200, order: order, message: 'Order received'});

  } catch(e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({status: 400, message: e.message});
  }
};

