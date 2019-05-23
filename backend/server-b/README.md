# Server B

This directory is for the code of the _server B_. A starter Dockerfile has been added, it has some comments to get you started.

To get started you should run `npm init` in this directory to initialize the Node project. This will create a `package.json`-file, which is used to define the project's attributes, dependencies etc. You should next create the index.js file.

# Documentation for Server B

The server uses the functions found in ./rabbit-utils to get tasks from the order queue and add tasks to the complete queue.

The worker arrangement is based on the "Work Queues" from https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html

### Scaling

Since one worker can process only one sandwich, the worker containers are scaled with docker. Currently the number of instances is defined during launch.

TODO: Automatic scaling depending on the amount of orders

## Running the server
Below are some commands to build the server and get it running.

```
# Rebuild the server
docker-compose build server-b

# Start one instance of the server
docker-compose up server-b

# To increase the amount of sandwiches processed, use --scale to start multiple instances of the server
docker-compose up --scale server-b=10 server-b
```