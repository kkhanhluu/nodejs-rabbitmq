# Basic.Get vs Basic.Consume 
## Basic.Get 
* By using `Basic.Get` to retrieve message, the application must sent a new request each time it wants to receive a message. 
* `Basic.Get` has worse performance than `Basic.Consume`

## Basic.Consume
* Consuming message with `Basic.Consume` means the application automatically receives message from RabbitMQ as they become available until the app issues a `Basic.Cancel`

# Performance-tuning consumers
## Increasing receive socket buffers in Linux 
This image belows show how a message is sent with RabbitMQ 

![image](https://learning.oreilly.com/library/view/rabbitmq-in-depth/9781617291005/05fig06_alt.jpg)

The default number of receive socket buffer in Linux OS is 128KB values. A `16MB` value should be adequate for most environments. 

## Controlling consumer prefetching via quality of service 
There is usually more than one message "in flight" on a channel at any given moment. Developers would often prefer to cap the size of this window to avoid the unbounded buffer problem on the consumer end. This is done by setting a "prefetch count" value using the `basic.qos` method.
For example, given that there are delivery tags 5, 6, 7, and 8 unacknowledged on channel Ch and channel Ch's prefetch count is set to 4, RabbitMQ will not push any more deliveries on Ch unless at least one of the outstanding deliveries is acknowledged.
