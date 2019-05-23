# Project plan for group 16

## Group infromation

229036 Touko Keski-Sämpi touko.keski-sampi@tuni.fi

281657 Khang Le Thanh khang.lethanh@tuni.fi

254380 Joel Gustafsson joel.gustafsson@tuni.fi

## Working during the project

### Timetable

| Part | Type of work | Done by | Assigned to |
| ------------- |:-------------:| -----:| -----:|
| Create react project | Implementation | Done | Khang |
| Docker | Research | Done | All |
| RabbitMQ | Research | Done | All |
| Swagger | Research | Done | All |
| Design the architecture | Design | Done | All |
| Create base for server A | Implementation | Done | Joel, Khang |
| Create base for server B | Implementation | Done | Touko |
| Add MongoDB to docker | Implementation | Done | Touko |
| Server A initial implementation | Implementation | Done | Joel, Khang |
| Server B initial implementation | Implementation | Done | Touko |
| Documentation for Server A | Documentation | 31.3. | Joel |
| Documentation for Server B | Documentation | Done | Touko |
| Documentation for message broker | Documentation | Done | Touko, Joel |
| Message broker initial implementation | Implementation | Done | Touko, Joel |
| Create a Sandwich page | Implementation | Done | Khang |
| Create a List Topping page | Implementation | Done | Khang |
| Design a layout of a site | Implementation | Done | Khang |
| Documentation for Frontend | Documentation | Done | Khang |
| Server A finalization | Implementation | 28.4. | Joel |
| Server B finalization | Implementation | 28.4. | Touko |
| Message broker finalization | Implementation | 28.4. | Touko, Joel |

The issue board will be used to handle tasks.

### Work hours
Touko, 6-12h / week

Khang, 12-15h / week

Joel, ~6h / week

## Instructions

Application can be started with "docker-compose up --build" command and can used via frontend localhost:3000. A test user is added to database on startup with credentials (username: test, password:test) and it can be used for testing purposes. A sandwich must be created before an order can be made. The sandwiches can be created by clicking "Create now" button. Some toppings are added to the database on start up and can be used to create a sandwich. It is also recommended to add a name for the sandwich. When an order is created by clicking the "Order" button next to the sandwich, the status of the most recent order made is tracked at the top of the page. Currently only one order can be tracked via frontend at the time.

More features can be used via swagger API.

- Frontend, localhost:3000
    - Username: test
    - Password: test
- MongoDB, localhost:8081
- Swagger API and docs, localhost/docs
- RabbitMQ, localhost::15672 


## Architecture design

The architecture design of the application is based on the project specification provided by the course staff. The user can order sandwiches and see the order status based on the unique order id. If the project schedule allows, extra features such as user authentication might also be done. The initial RabbitMQ message queues might also be changed from Work Queue to RPC to track the orders more precisely. The application consists of front end and back end and the front end is implemented after the back end. The architecture is shown in the figure 1.

![Application architecture](resources\architecure.png)
**Figure 1. Application architecutre**
### Back End
#### RabbitMQ
The RabbitMQ has two work queues called “sandwich-order” and “sandwich complete”. The new orders are in the “sandwich-order” and the completed orders are in the “sandwich-complete” work queue.
#### Server A
Server A processes the orders made by the user and adds them to RabbitMQ message queue called “sandwich order”. The payload of the message is the whole order object that includes the order id, sandwich id and the status of the order. On start up the orders with statuses "received" and "inQueue" are automatically added to the Rabbit MQ sandwich-order work queue.

 The following list describes the order process in server A.
1.	Server A receives an order from the user
2.	Order is added to MongoDB and the order status is set to “received” or “failed”
3.	Order is forwarded to RabbitMQ sandwich-order work queue
4.	Order status is updated in the database based on the reply from RabbitMQ to “inQueue” or “failed”
5.	Message from RabbitMQ “sandwich-complete” queue is received, and the status is updated to “completed”
6.	The user is informed that the order has been completed
#### Server B
Server B processes the messages and interacts with the work queues of RabbitMQ. The process of the orders in Server B is described below:
1.	Poll message from the front of the work queue “sandwich-order”
2.	Process the order for 20 seconds
3.	After the order is processed add the order to “sandwich-complete”
4.	If the order is successfully added to “sandwich-complete” queue, an ACK message is sent to RabbitMQ and the order is deleted from the “sandwich-order” queue
5.	The process is started from the beginning
#### MongoDB
Sandwich orders and their statuses as well as the different type of sandwiches are stored in the database. Only server A has access to the database and it updates the statuses of the sandwiches based on the respond messages of the RabbitMQ.

#### Front End
Technology on Frontend is ReactJS for Post and Get API, Bootstrap4 for design layout of the site
Server B processes the messages and interacts with the work queues of RabbitMQ. The process of the site is described below:
1.	On Login page, User needs to log in by username: test and password: test. ReactJS will post value of 2 fields: username and password to MongoDB. If 2 values fields (test-test) are correct, user will link to Sandwich Page
2.	On Sandwich page, User can order a sandwich which user wants. User can check topping of each sandwich by clicking the toggle next to sandwich name. After clicking "Order", The page will show the status of order: "Received". After 5 seconds, the status of Order will change to "InQueue". After 5 seconds, the status of order will change to "Ready". 
3.	If user does not like any suggested sandwich, User can click "Create a custom sandwich" to make user's favourite sandwich
4. After clicking "Create a custom sandwich", user will direct to "Topping" page.
5.	On Topping page, user can choose user's favourite topping and name user's sandwich. After all, user will click "save" then the page will link user back to "Sandwich" Page
6.	On Sandwich Page, user can order the user's custom sandwich. The status of user's order will be changed in every 5 seconds from "Received - InQueu - Ready"

## Further improvements

With more time the following imporvements could be made to our project

- RabbitMQ
    - Change work queue to RPC which would allow track orders that are being prosessed more precisely
- Frontend
    - Track all orders made by the user
    - User registeration
    - Make sandwich name mandatory
    - Do not allow duplicate sandwiches


