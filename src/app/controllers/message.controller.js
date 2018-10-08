const MessageService = require('../services/message.services');

exports.sendMessage = async function(req, res) {
  try {
    let msg = await MessageService.sendMessage(req);
    return res.status(201).json({status: 201, msg: msg, message: 'Message sent'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.getMessage = async function(req, res) {
  try {
    let msg = await MessageService.getMessage(req);
    return res.status(201).json({status: 201, msg: msg, message: 'Message received'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.getInboxMessages = async function(req, res) {
  try {
    let inbox = await MessageService.getInboxMessages(req);
    return res.status(201).json({status: 201, inbox: inbox, message: 'Inbox messages received'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.getOutboxMessages = async function(req, res) {
  try {
    let outbox = await MessageService.getOutboxMessages(req);
    return res.status(201).json({status: 201, outbox: outbox, message: 'Outbox messages received'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};

exports.deleteMessage = async function(req, res) {
  try {
    let msg = await MessageService.deleteMessage(req);
    return res.status(201).json({status: 201, msg: msg, message: 'Message deleted'});

  } catch(e){
    return res.status(409).json({status: 409, message: e.message});
  }
};
