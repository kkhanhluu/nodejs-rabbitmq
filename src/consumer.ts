import { ConsumeMessage } from "amqplib";
import { RabbitMQClient } from "./client";

(async () => {
  try {
    const consumer = await RabbitMQClient.build("rabbitMQ-test");
    consumer.subscribe((message) => {
      console.log(`✅ received message: ${message?.content.toString()}`);

      // async stuff like working with database or send http request
      setTimeout(() => {
        //   consumer.channel.nack(message as ConsumeMessage);
        consumer.channel.nack(message as ConsumeMessage, false, false);
      }, 500);
    });
  } catch (err) {
    console.error(err);
  }
})();
