const Order = require('../models/order.model');

exports.createOrder = function (req) {
  try {
    

  } catch (e) {
    throw {error: e, message: 'Order creation error'};
  }
};

exports.getOrders = function (req) {
  try {
    let promise = Order.paginate(query, queryOptions);
    return promise.then((doc) => {
      if(doc === null) { throw Error('No orders found'); }
      return doc;
    });

  } catch (e) {
    throw {error: e, message: 'Error on get orders'};
  }
};

//
// exports.updateOrder = function (req) {
//   try {
//     let promise = Order.findByIdAndUpdate(req.params.id, {
//       title: req.body.title,
//       content: req.body.content,
//       images: req.body.images,
//       video: req.body.video,
//       tags: req.body.tags,
//       edited: Date.now()
//     }, { new: true });
//
//     return promise.then((doc) => {
//       if(doc === null) {
//         throw Error('Order not found');
//       }
//       return doc;
//     });
//
//   } catch(e){
//     throw {error: e, message: 'Error at artcile update services'};
//   }
// };
