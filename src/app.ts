import { RabbitMQClient } from "./client";

(async () => {
  try {
    const publisher = await RabbitMQClient.build("");
    publisher.channel.publish("test", "test", Buffer.from("test message"), {
      mandatory: true,
    });
  } catch (err) {
    console.error(err.message);
  }
})();
