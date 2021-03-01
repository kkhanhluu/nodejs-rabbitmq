import amqp, {
  ConfirmChannel,
  Connection,
  ConsumeMessage,
  Replies,
} from "amqplib";
import dotenv from "dotenv";

dotenv.config();

export class RabbitMQClient {
  private connection!: Connection;

  public channel!: ConfirmChannel;

  private queue: string;

  private constructor(queue: string) {
    this.queue = queue;
  }

  public static build(queue: string): Promise<RabbitMQClient> {
    return new Promise((resolve, reject) => {
      try {
        const rabbitMQClient = new RabbitMQClient(queue);
        rabbitMQClient.connect().then(async () => {
          const queueExisted = await rabbitMQClient.checkQueue(queue);
          if (!queueExisted) {
            throw new Error("No queue found");
          }
          resolve(rabbitMQClient);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private async connect() {
    this.connection = await amqp.connect({
      protocol: process.env.RABBIT_MQ_PROTOCOL,
      hostname: process.env.HOSTNAME,
      port: Number(process.env.RABBIT_MQ_PORT),
      username: process.env.RABBIT_MQ_USERNAME,
      password: process.env.RABBIT_MQ_PASSWORD,
      vhost: process.env.RABBIT_MQ_VHOST,
    });
    this.channel = await this.connection.createConfirmChannel();
    this.channel.prefetch(1);
    this.channel.on("return", (message: ConsumeMessage) => {
      console.error(`❌ Non routable message: ${message.content.toString()}`);
    });
  }

  sendMessage(
    message: string,
    errorCallback: (error: any) => void,
    successCallback: () => void,
    options = {}
  ): boolean {
    return this.channel.sendToQueue(
      this.queue,
      Buffer.from(message),
      { mandatory: true, ...options },
      (err, ok) => {
        if (err) {
          errorCallback(err);
        } else {
          successCallback();
        }
      }
    );
  }

  subscribe(
    callback: (message: ConsumeMessage | null) => void
  ): Promise<Replies.Consume> {
    return this.channel.consume(this.queue, callback, { noAck: false });
  }

  private checkQueue(queue: string): Promise<Replies.AssertQueue> {
    return this.channel.checkQueue(queue);
  }
}
