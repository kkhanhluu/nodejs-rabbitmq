import { Replies } from "amqplib";
import readline from "readline";
import { RabbitMQClient } from "./client";

function handleSuccessMessage(message: Replies.Empty) {
  console.log(`✅ message: "${message}" was sent`);
  console.log("=========================================================== \n");
}

function handleErrorMessage(err: any) {
  console.log(
    `❌ message was not sent because ${JSON.stringify(err, null, 4)}`
  );
}

(async () => {
  try {
    const publisher = await RabbitMQClient.build("rabbitMQ-test");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptMessage = () => {
      rl.question("Enter message to send \n", (message) => {
        publisher.sendMessage(message, handleErrorMessage, () => {
          handleSuccessMessage(message);
          promptMessage();
        });
      });
    };

    promptMessage();
  } catch (err) {
    console.error(err);
  }
})();
