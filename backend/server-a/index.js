'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;
var utils = require('./utils/writer.js');

// MongoDB & Mongoose configuration in separate file
var database = require('./database.js');
var Order = require('./service/OrderService');

// RabbitMQ
var receiveTask = require('./rabbit-utils/receiveTask');
var rabbitMQHost = "rapid-runner-rabbit:5672";
var completeQueueName = "sandwich-complete";



// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

var cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Start the queue-putter

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});

const updateStatus = (msgBody) => {
  console.log(" [x] Updating order '%s' status to complete", msgBody);
  var orderId = JSON.parse(msgBody)._id;
  console.log("Attempting to update status of order:'%s'", orderId);

  Order.updateOrder(orderId, {status: "ready"})
    .then(function (response) {
      console.log("Order updated: %s", response);
    })
    .catch(function (error) {
      console.log("Error updating order: %s", error);
    });
};

  // Start listening to the sandwich-complete queue
  receiveTask.getTask(rabbitMQHost, completeQueueName, updateStatus);



