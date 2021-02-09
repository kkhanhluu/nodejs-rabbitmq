import amqp, { ConsumeMessage } from "amqplib";

const queue = "hello";
(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.consume(queue, (message) => {
      console.log(`[x] Receveied message ${message?.content.toString()}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
