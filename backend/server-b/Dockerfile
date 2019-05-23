# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image from Docker Hub
# which has been tagged "10"
FROM node:10

# Create the working directory
WORKDIR /usr/src/server-b

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install node dependencies
RUN npm install

# Bundle the application
COPY . .

# Map the used port
EXPOSE 8888

# Startup command
CMD [ "./wait-for-it.sh", "rapid-runner-rabbit:5672", "--timeout=500", "--", "npm", "start" ]
