# Dockerfile for the frontend

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image from Docker Hub
# which has been tagged "10"
FROM node:10

# Set work dir
RUN mkdir /app
WORKDIR /app

# Intall dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY / /app/

# Build the application
RUN yarn build

# Setup and run the web server
EXPOSE 3000
CMD ["yarn", "start"]
