import amqp from "amqplib";

const queue = "hello";
(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const message = "i am trying to connect to rabbitmq";

  channel.assertQueue(queue, {
    durable: false,
  });

  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`[x] Sent ${message}`);
})();
