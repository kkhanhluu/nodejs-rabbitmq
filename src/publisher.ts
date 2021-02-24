import readline from "readline";
import { RabbitMQClient } from "./client";

(async () => {
  try {
    const publisher = await RabbitMQClient.build("rabbitMQ-test");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptMessage = () => {
      rl.question("Enter message to send \n", (message) => {
        publisher.sendMessage(message);
        console.log(`✅ message: "${message}" was sent`);
        console.log(
          "=========================================================== \n"
        );
        promptMessage();
      });
    };

    promptMessage();
  } catch (err) {
    console.error(err);
  }
})();
