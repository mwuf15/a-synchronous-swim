const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageToBeQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  console.log('res=>',res);
  // const validMessages = ['left', 'right', 'up', 'down'];
  // const directionData = (validMessages) => {
  //   const random = Math.floor(Math.random() * validMessages.length);
  //   return validMessages[random];
  // }
  var dequeuedMsg = messageToBeQueue.dequeue();
  res.writeHead(200, headers);
  res.end(dequeuedMsg);
  next(); // invoke next() at the end of a request to help with testing!
};
