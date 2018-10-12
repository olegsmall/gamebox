const Message = require('../models/message.model');
const User = require('../models/user.model');
const {mongoose} = require('../../config/app.config');
const idvalidator = mongoose.Types.ObjectId.isValid; //Mongoose objectId validator


exports.sendMessage = function (req) {

  let receiver = '';
  if (req.body.email){
    //TODO: Найти юзера по мылу и в полу ресивер присвоить айди этого юзера.
    receiver = '';
  }

  receiver = req.body.receiver;

  // Check if receiver's id format is correct
  if(!idvalidator(req.body.receiver)) {throw Error('Wrong user id');}

  try {
    // Search receiver's id in DB
    return User.findById(req.body.receiver).select({password: 0}).then((user,err) => {
      if(err) {throw err;}
      if(user === null) {throw Error('User not found');}

      // Create message object
      let message = new Message({
        subject: req.body.subject,
        content: req.body.content,
        sender: req.user._id,
        receiver: req.body.receiver
      });

      // Save message id in receiver's outbox messages
      user.messages.inbox.push(message._id); //receiver
      user.save();

      // Save message id in sender's outbox messages
      req.user.messages.outbox.push(message._id);
      req.user.save();

      // Save message
      return message.save();
    });
  } catch (e) {
    throw Error('Error on message sending');
  }

};


exports.getMessage = function (req) {
  try {
    // Search message by id
    return Message.findById(req.params.id).then((doc, err) => {
      if(err) {throw err;}
      if(doc === null) {throw Error('Message not found');}
      // Change message status to true -> 'read'
      if(!doc.read) {doc.read = true;}
      doc.save();

      return doc;
    });
  } catch (e) {
    throw Error('Error on get message');
  }
};


exports.getInboxMessages = function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects

  queryOptions.populate = {path: 'sender', select: 'firstName lastName'};   // Populate query fields

  try {
    return User.findById(req.user._id).select('messages.inbox').then((msg) => {
      let inbox = msg.messages.inbox;

      query = {_id: {$in: inbox}};

      return Message.paginate(query, queryOptions).then((docs) => {
        return docs;
      });
    });
  } catch (e) {
    throw Error('Error on get messages.');
  }
};

exports.getOutboxMessages = function (req) {

  let queryOptions = {}; // Mongoose-paginator query options
  let query = {}; // Mongoose query options

  req.query.page ? queryOptions.page = Number(req.query.page) : 1; //Page option
  req.query.limit ? queryOptions.limit = Number(req.query.limit) : 10; // Limit number of returning objects

  queryOptions.populate = {path: 'receiver', select: 'firstName lastName'};   // Populate query fields

  try {
    return User.findById(req.user._id).select('messages.outbox').then((msg) => {
      let outbox = msg.messages.outbox;

      query = {_id: {$in: outbox}};

      return Message.paginate(query, queryOptions).then((docs) => {
        return docs;
      });
    });
  } catch (e) {
    throw Error('Error on get messages.');
  }
};

exports.getNewMessages = function (req) {
  try {
    return Message.find({receiver: req.user._id, read: false}).then((msg, err) => {
      return msg.length;
    })
  } catch (e) {
    throw Error('Error at get new messages.');

  }
};

exports.deleteMessage = function (req) {
  try {
    return User.findById(req.params.id).select('messages').then((messages, err) => {
      if(err) {throw err;}
      let inbox = messages.messages.inbox;
      let outbox = messages.messages.outbox;

      if(inbox.indexOf(req.body.message_id) > -1) {
        inbox.splice(inbox.indexOf(req.body.message_id), 1);
      }
      if (outbox.indexOf(req.body.message_id) > -1) {
        outbox.splice(outbox.indexOf(req.body.message_id), 1);
      }

      return messages.save();
    });
  } catch(e) {
    throw Error('Error at delete message');
  }
};
