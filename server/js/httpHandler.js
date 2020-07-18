const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageToBeQueue = require('./messageQueue');
const keypress = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

keypress.initialize(message => messageToBeQueue.enqueue(message));
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // console.log('messageQueue',messageQueue);
  // const validMessages = ['left', 'right', 'up', 'down'];
  // const directionData = () => {
  //   const random = Math.floor(Math.random() * validMessages.length);
  //   return validMessages[random];
  // }
  // if (req.method === 'GET' && req.url === '/img') {
  //   console.log('we got image')
  //   res.writeHead(404, headers);
  //   res.end();
  // }

  if (req.method === 'GET') {
    // keypressHandler.initialize(message => msgqueue.enqueue(message));
    if (req.url === '/background.jpg') {
      console.log('we got image')
      //if we find the file, we send it to the client with 200
      if (module.exports.backgroundImageFile) {
        fs.readFile(module.exports.backgroundImageFile, (err, data) => {
          if (err) {
            console.log('error :', err);
            // throw err;
          }
          console.log(data);
        })
        console.log('200 : testing')
        res.writeHead(200, headers);
        res.end();
      } else {
        console.log('400 : testing')
        res.writeHead(404, headers);
        res.end();
      }
      //if not, send 404 error
    }
    // console.log(messageQueue);
    // messageToBeQueue.enqueue(messageQueue);
    if ( req.url === '/') {
      var dequeuedMsg = messageToBeQueue.dequeue();
      res.writeHead(200, headers);
      res.end(dequeuedMsg);
    }
    // res.end(directionData());
    // next();
  }
  if (req.method === 'POST') {
    res.writeHead(201, headers);
    res.end();
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
