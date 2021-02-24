# RabbitMQ won't accept non-routable message with mandatory set 
When the `mandatory` flag is sent along with `Basic.Publish` command, if a message isn't routable, it should be sent back to publisher via `Basic.Return` 
```javascript
channel.publish('not existing exchange', 'not existing route key', 'message', {
    mandatory: true
})
```
If the above example is executed, an exception with 'NO_ROUTE' should be thrown. 
The publisher can listen to event `return` for sent back messages. <http://www.squaremobius.net/amqp.node/channel_api.html#channel_events>
# Publisher confirm 
Prior to publishing any messages, a message publisher must issue a `Confirm.Select` RPC request to RabbitMQ and wait for a `Confirm.SelectOk` response to know that delivery confirmations are enabled. 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/04fig04_alt.jpg)

* `Basic.Ack` request is sent to publisher when the message was consumed by consumer applications on all queues it was routed to, or when message was enqueued and persisted if requested. 
* If a message can't be routed, the broker will send a `Basic.Nack` request indicating the failure. 

# Using alternate exchange for unroutable messages 
An alternate exchange specifies a preexisting exchange in RabbitMQ that the new exchange will route messages to, should the exchange not be able to route messages.

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/04fig05_alt.jpg)
`Alternate exchange` can be setup in UI-management or in code with function `channel.assertExchange()`

# Persisting message to disk via delivery-mode 2
* Storing the message to disk ensures that if the RabbitMQ broker is restarted for any reason, the message will still be in the queue once RabbitMQ is running again.
* RabbitMQ writes persisted messages to disk and keeps track of them by reference until they’re no longer in any queue. Once all of the references for a message are gone, RabbitMQ will then remove the message from disk. 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/04fig09_alt.jpg)

* Although message persistence is one of the most important ways to guarantee that your messages will ultimately be delivered, it’s also one of the most costly. Poor disk performance can greatly degrade your RabbitMQ message publishing velocity

# When RabbitMQ pushes back 
* If publisher application started to overwhelm RabbitMQ by publishing messages too quickly. RabbitMQ would stop accepting low-level data on the TCP socket. 
* Internally, RabbitMQ uses credit to manage when it's going to push back against publisher. 
* When a new connection is made, the connection is allotted a predetermined amount of credits it can use. Then, as each RPC command is received by RabbitMQ, a credit is decremented. Once the RPC request has been internally processed, the connection is given the credit back. A connection’s credit balance is evaluated by RabbitMQ to determine if it should read from a connection’s socket. If a connection is out of credits, it’s simply skipped until it has enough credits.
* `Connection.Blocked` and `Connection.Unblocked` are asynchrounous methods that can be sent at any time to notify client that RabbitMQ has blocked or unblocked client. 
```javascript
channel.on('blocked', function(reason){
}); 

channel.on('unblocked', function() {
});
```
