import amqp from "amqplib";

const message = process.argv.slice(2).join(" ") || "Hello world";

const queue = "hello";
(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // durable: queue survive a RabbitMQ node restart.
  channel.assertQueue(queue, {
    durable: true,
  });

  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  console.log(`[x] Sent ${message}`);
})();
