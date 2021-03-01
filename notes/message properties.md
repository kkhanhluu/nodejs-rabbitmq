|Property|Type|For use by|Suggested or specified use|
|--- |--- |--- |--- |
|app-id|short-string|Application|Useful for defining the application publishing the messages.|
|content-encoding|short-string|Application|Specify whether your message body is encoded in some special way, such as zlib, deflate, or Base64.|
|content-type|short-string|Application|Specify the type of the message body using mime-types.|
|correlation-id|short-string|Application|If the message is in reference to some other message or uniquely identifiable item, the correlation-id is a good way to indicate what the message is referencing.|
|delivery-mode|octet|RabbitMQ|A value of 1 tells RabbitMQ it can keep the message in memory; 2 indicates it should also write it to disk.|
|expiration|short-string|RabbitMQ|An epoch or Unix timestamp value as a text string that indicates when the message should expire.|
|headers|table|Both|A free-form key/value table that you can use to add additional metadata about your message; RabbitMQ can route based upon this if desired.|
|message-id|short-string|Application|A unique identifier such as a UUID that your application can use to identify the message.|
|priority|octet|RabbitMQ|A property for priority ordering in queues.|
|timestamp|timestamp|Application|An epoch or Unix timestamp value that can be used to indicate when the message was created.|
|type|short-string|Application|A text string your application can use to describe the message type or payload.|
|user-id|short-string|Both|A free-form string that, if used, RabbitMQ will validate against the connected user and drop messages if they don’t match.|

See [amqblib's documentation](http://www.squaremobius.net/amqp.node/channel_api.html#channel_publish) to see how to work with these properties in javascript. 
