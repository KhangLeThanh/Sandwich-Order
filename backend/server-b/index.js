var sendTask = require('./rabbit-utils/sendTask');
var receiveTask = require('./rabbit-utils/receiveTask');

var rabbitMQHost = "rapid-runner-rabbit:5672";
var orderQueueName = "sandwich-order";
var completeQueueName = "sandwich-complete";

console.log("Server B starting...");

const sendReply = function(msgBody) {
  console.log(" [x] Replying with '%s'", msgBody);

  // Just send the message back to another queue
  // TODO: Change to the actual message format
  sendTask.addTask(rabbitMQHost, completeQueueName, msgBody);
};

// Start listening to the order queue
receiveTask.getTask(rabbitMQHost, orderQueueName, sendReply);
