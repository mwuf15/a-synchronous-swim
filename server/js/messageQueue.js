const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log('inside messagequeue=>',messages)
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return messages.shift();
  console.log('dequeue=>',messages)
};

