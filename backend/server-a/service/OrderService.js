'use strict';

var mongoose = require('mongoose');
var OrderModel = mongoose.model('Order');

var sendTask = require('../rabbit-utils/sendTask');
var receiveTask = require('../rabbit-utils/receiveTask');
var rabbitMQHost = "rapid-runner-rabbit:5672";
var orderQueueName = "sandwich-order";
var completeQueueName = "sandwich-complete";
var fromDB = require('../utils/addOrders.js');

/**
 * Add an order for an order
 *
 * order Order place an order for a order
 * returns Order
 **/
exports.addOrder = function (order) {
  return new Promise(function (resolve, reject) {
    var new_order = new OrderModel(order);
    new_order.save(function (err, order) {
      if (err) {
        reject(err);
        return;
      }
      resolve(order);
      // Add order to RabbitMQ "sandwich-order" work queue if order was successfully added to DB
      fromDB.AddOrdersFromDB();
      // sendTask.addTask(rabbitMQHost, orderQueueName, order);
      // console.log(" Added task to rabbitMQ sandwich-order")
    });
  });
}

/**
 * Update an order
 * 
 * orderId Order to be updated
 * body new fields
 **/
exports.updateOrder = function (orderId, body) {
  return new Promise(function (resolve, reject) {
    OrderModel.findOneAndUpdate({ _id: orderId }, body, {new: true}, function (err, order) {
      if (err) {
        reject(err);
        return;
      }
      resolve(order);
    });
  });
}

/**
 * Find an order by its ID
 * IDs must be uuids
 *
 * orderId Long ID of order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function (orderId) {
  return new Promise(function (resolve, reject) {
    OrderModel.findById(orderId, function (err, order) {
      if (err) {
        reject(err);
        return;
      }
      resolve(order);
    });
  });
}


/**
 * Get list of orders with spesific status
 *
 * returns ArrayOfOrders
 **/
exports.getOrdersByStatus = function (status) {
  return new Promise(function (resolve, reject) {
    OrderModel.find({ "status" : status }, function (err, orders) {
      if (err) {
        reject(err);
        console.log("error");
        return;
      }
      resolve(orders);
    });
  });
}

/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function () {
  return new Promise(function (resolve, reject) {
    OrderModel.find(function (err, orders) {
      if (err) {
        reject(err);
        return;
      }
      resolve(orders);
    });
  });
}

