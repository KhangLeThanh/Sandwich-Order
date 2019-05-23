var Order = require('../service/OrderService');

// RabbitMQ
var sendTask = require('../rabbit-utils/sendTask');
var rabbitMQHost = "rapid-runner-rabbit:5672";
var orderQueueName = "sandwich-order";


// Function should only be called when the server A is started so the orders
// that were previously in the queue are added to it again.
exports.AddOrdersFromDB = function() {
    console.log("Adding order from DB to RabbitMQ")
    // Find orders with the status "received" and "inQueue"
    Order.getOrdersByStatus("received").then((receivedOrders) => {
      console.log("%s", receivedOrders);
      for (var i = 0; i < receivedOrders.length; i++){
        var obj = receivedOrders[i];
        sendTask.addTask(rabbitMQHost, orderQueueName, obj);
      }
    });;
    Order.getOrdersByStatus("inQueue").then((inQueueOrders) => {
      for (var j = 0; j < inQueueOrders.length; j++){
        var obj = inQueueOrders[j];
        sendTask.addTask(rabbitMQHost, orderQueueName, obj);
      }
    });;
  }
  