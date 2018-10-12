/**
 * Created by: Peter Yablochkin
 * Created: 8 Oct 2018
 * Edited: 11 Oct 2018 by Peter Yablochkin
 *
 * @fileoverview Manages CRUD requests for messages.
 * @module controllers/messages.controller
 * @requires MessageService
 */

// Importing Message services
const MessageService = require('../services/message.services');

/**
 * Manages message creation and send feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.sendMessage = async function(req, res) {
  try {
    // Execute message creation method.
    let msg = await MessageService.sendMessage(req);
    // Return message with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, msg: msg, message: 'Message sent'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search feature of a concrete message
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getMessage = async function(req, res) {
  try {
    // Execute message search method.
    let msg = await MessageService.getMessage(req);
    // Return message with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, msg: msg, message: 'Message received'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search of a new messages
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getNewMessages = async function(req, res) {
  try {
    // Execute search of new messages
    let messages = await MessageService.getNewMessages(req);
    // Return number of new messages with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, messages: messages, message: 'New messages received'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search of inbox messages
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getInboxMessages = async function(req, res) {
  try {
    // Executes search of inbox messages
    let inbox = await MessageService.getInboxMessages(req);
    // Return inbox messages with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, inbox: inbox, message: 'Inbox messages received'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages search of outbox messages
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.getOutboxMessages = async function(req, res) {
  try {
    // Executes search of outbox messages
    let outbox = await MessageService.getOutboxMessages(req);
    // Return outbox messages with appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, outbox: outbox, message: 'Outbox messages received'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};

/**
 * Manages message delete feature
 *
 * @param req object - request info
 * @param res object - response info
 * @returns {Promise<*|Promise<json>>} A promise that returns json if resolved, otherwise json with error
 */
exports.deleteMessage = async function(req, res) {
  try {
    // Execute message delete method.
    let msg = await MessageService.deleteMessage(req);
    // Return deleted message with ratings and appropriate HTTP Status Code and Message.
    return res.status(201).json({status: 201, msg: msg, message: 'Message deleted'});
  } catch(e){
    //Return Error Message with HTTP Status Code.
    return res.status(409).json({status: 409, message: e.message});
  }
};
