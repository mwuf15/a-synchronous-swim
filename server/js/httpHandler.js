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
  // console.log('modules => ',module.exports.backgroundImageFile);

  if(req.method === 'OPTIONS' && req.url === '/') {
    // console.log('end point is test: ')
    res.writeHead(200, headers);
    res.end();
  }

  if(req.method === 'GET' && req.url === '/') {

    res.writeHead(200, headers);
    res.end(queueMessage.dequeue());
    // res.end(random());
  }

  if(req.method === 'GET' && req.url === '/background.jpg') {
    //background image
    //if (req.url === '/')
    console.log('endpoint for image reached')
    if (module.exports.backgroundImageFile && module.exports.backgroundImageFile === 'background.jpg') {
      res.writeHead(200, headers);
      res.end(module.exports.backgroundImageFile)
    }else{
      //else if (req.url === '/background.jpg')
      fs.readFile (module.exports.backgroundImageFile, (err, data) =>{
        if (err) {
          res.writeHead(404,headers);
        } else {
          res.writeHead(202,headers);
          res.write(data,'binary');
          }
          res.end();
          next();
      })
      // res.writeHead(404, headers);
      // res.end();
    }
  }


  next(); // invoke next() at the end of a request to help with testing!
};
