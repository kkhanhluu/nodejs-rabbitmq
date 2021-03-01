import { ConsumeMessage } from "amqplib";
import { RabbitMQClient } from "./client";

(async () => {
  try {
    const consumer = await RabbitMQClient.build("rabbitMQ-test");
    consumer.subscribe((message) => {
      console.log(`✅ received message: ${message?.content.toString()}`);
      // consumer.channel.ack(message as ConsumeMessage);
      // async stuff like working with database or send http request
      setTimeout(() => {
        consumer.channel.ack(message as ConsumeMessage);
        // consumer.channel.nack(message as ConsumeMessage, false, false);
      }, 12000);
    });
  } catch (err) {
    console.error(err);
  }
})();
