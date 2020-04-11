const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

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

  // res.writeHead(200, headers);
  // res.end();
  // if (req.method === 'GET') {//-------mw
  //   res.writeHead(200, headers);//-------mw
  //   res.end(random());//-------mw
  // }
  if(req.method === 'OPTIONS' && req.url === '/') {
    // console.log('end point is test: ')
    res.writeHead(200, headers);
    res.end();
  }

  if(req.method === 'GET' && req.url === '/') {
    // console.log('end point root')
    res.writeHead(200, headers);
    res.end(random());
  }

  next(); // invoke next() at the end of a request to help with testing!
};
