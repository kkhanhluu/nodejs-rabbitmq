# AMQ Protocol 
## AMQP as an RPC transport 
### Kicking off conversation
1. Client sends *protocol header* to server. 
2. Server reply greeting with a `Connection.Start` Command
3. The client responds to RPC Request with `Connection.StartOK` response. 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig01_alt.jpg)

### Channel
Some applications need mutltiple logical connections to the broker. However, keeping many TCP connections open at the same time is undesireable. AMQP 0-9-1 connections are multiplexed with `channels`, which means, a single AMQP connection can have multiple channels, allowing multiple conversations between a client and server to take place. 

## AMQP's RPC Frame structure 
Similar to OOP in C++ or Java, AMPQ uses classes and methods, referred to as `AMQP commands`, to create common language between client and server. 
![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig02.jpg)
### AMQP frame components
When commands are sent from RabbitMQ, all of the arguments required to execute them are encapsulated in data structures called frames that encode the data for tranmission. AMQP frame is composed of 5 distinct components: 
1. Frame type
2. Channel number
3. Frame size in bytes
4. Frame payload 
5. End-byte marker 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig03_alt.jpg)
#### 1. Types of frames
- `Protocol header frame` is used once, when connecting to RabbitMQ 
- `Method frame` carries with it the command that being sent or received from RabbitMQ 
- `Header frame` contains the size and properties for a message 
- `Body frame` contains the content of message 
- `Hearbeat frame` is used as a check to ensure that both sides of connection are available (Can be changed by `hearbeat` in rabbitmq.config file)

#### 2. Marshaling messages into frames
`Method frame`, `Header frame` and `body frame` are used when a message is published to RabbitMQ. `Method frame` carries the command and parameters required to execute it (i.e. exchange and routing key). `Header frame` contains the size and properties of message. AMQP has a maximum frame size. If the message body exceeds that size, the content will be split into mutiple `Body frames`. 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig04_alt.jpg)

## Putting the protocol to use 
Before a message can be published into a queue, a few step must be taken care of. At a minimum, both exchange and a queue must be set up and bound togther. 
### Declare an exchange 
- Exchanges are created created using the `Exchange.Declare` commannd, which has arguments that define the name, type of exchange and other metadata 
- After RabbitMQ has created the exchange, an `Exchange.DeclareOk` command is sent in response. If, for whatever reason, the command fail, RabbitMQ will close the channel that the `Exchange.Declare` command was sent on. 
![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig08_alt.jpg)

### Declare a queue
Once the exchange has been created, a queue is created. It's similar to declare an exchange but with `Queue.Declare` and `Queue.DeclareOk` commands. 
![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig09_alt.jpg)
- If a new queue with different properties but with the same is declared, RabbitMQ will close the previous channel. 
- If `Queue.Declare` command is sent with an user that doesn't have access on the virtual host, the channel will close with 403 error. 

### Binding a queue to an exchange 
After queue and exchange are created, it's time to bind them together with `Queue.Bind` command and `Queue.BindOk` response.

### Publishing a message to RabbitMQ 
When RabbitMQ receives `Method frame` with command `Basic.Publish` carries with exchange name and routing key, `header frame` and at least 1 `body frame`, the message will be published. 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig11.jpg)
* Once all copies of message have been delivered or removed, the message will be removed from memory in RabbitMQ
* If exchange does not exist, RabbitMQ will silently drop the messages. To ensure the delivery of message, either set mandatory flag to true or use delivery confirmations. 

### Consuming messages from RabbitMQ 
Consumer subscribe to the queue by issuing `Basic.Consume` command, the server will responds wiht `Basic.ConsumeOk`
![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig12_alt.jpg)
* If consume wants to stop receiving message, it can issue `Basic.Cancel` command. 
* If *no_ack* flag is set to false, a consumer must acknowledge each message it receives by sending `Basic.Ack`
![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/02fig13_alt.jpg)
