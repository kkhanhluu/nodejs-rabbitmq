import amqp, { ConsumeMessage } from "amqplib";

const queue = "hello";
(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
      durable: true,
    });

    // broker not assign more than 1 message to a worker at a time. In other words, don't dispatch a new message to a worker until it
    // has process and acknowledged the previous one.
    channel.prefetch(1);

    channel.consume(
      queue,
      (message) => {
        console.log(`[x] Receveied message ${message?.content.toString()}`);

        const secs =
          (message as ConsumeMessage).content.toString().split(".").length - 1;
        setTimeout(() => {
          console.log("[x] Done");
          channel.ack(message as ConsumeMessage);
        }, secs * 1000);
      },
      {
        // consumer send acknowledgment back to queue after consuming message
        noAck: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
