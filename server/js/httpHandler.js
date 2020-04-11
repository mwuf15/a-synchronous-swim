const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const queueMessage = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

let directions = ['up', 'down', 'left', 'right'];//-------mw
let random = function () {//-------mw
  let idx = Math.floor(Math.random() * directions.length)//-------mw
  return directions[idx]//-------mw
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if(req.method === 'OPTIONS' && req.url === '/') {
    // console.log('end point is test: ')
    res.writeHead(200, headers);
    res.end();
  }

  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, headers);
    console.log('success => ' , queueMessage.dequeue())
    res.end(queueMessage.dequeue());

  }

  if(req.method === 'GET' && req.url === '/random') {
    // console.log('end point random')
    res.writeHead(200, headers);
    res.end(random());
  }


  next(); // invoke next() at the end of a request to help with testing!
};
