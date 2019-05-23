#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
var Order = require('../service/OrderService');

module.exports.addTask = function(rabbitHost, queueName, order){
  amqp.connect('amqp://' + rabbitHost)
  .then(function(c) {
    c.createConfirmChannel()
    .then(function(ch) {
      ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
      function(err, ok) {
      var orderId = order._id;
        if (err !== null){
          console.warn(new Date(), 'Message nacked!');
          var status = {status: "failed"};
        }
        else {
          console.log(new Date(), 'Message acked');
          var status = {status: "inQueue"};
        }
        Order.updateOrder(orderId, status)
          .then(function (response) {
            console.log("Order updated: %s", response);
          })
          .catch(function (error) {
            console.log("Error updating order: %s", error);
          });
      });
    });
  });
}
