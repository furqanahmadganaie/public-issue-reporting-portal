import { Kafka } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((broker) => broker.trim())
  .filter(Boolean);

if (brokers.length === 0) {
  throw new Error("KAFKA_BROKERS environment variable is required");
}

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "public-issue-reporting-portal",
  brokers,
});

export const producer = kafka.producer();

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

export const disconnectKafkaProducer = async () => {
  await producer.disconnect();
  console.log("Kafka Producer Disconnected");
};

export const publishEvent = async ({ topic, key, event }) => {
  await producer.send({
    topic,
    messages: [
      {
        key: key ? String(key) : undefined,
        value: JSON.stringify(event),
      },
    ],
  });
};


// ==================== CONSUMER ====================

export const consumer = kafka.consumer({
  groupId:
    process.env.KAFKA_GROUP_ID ||
    "notification-service-group",
});

export const connectKafkaConsumer = async () => {
  await consumer.connect();
  console.log("Kafka Consumer Connected");
};

export const subscribeToTopic = async (topic) => {
  await consumer.subscribe({
    topic,
    fromBeginning: true,
  });

  console.log(`Subscribed to topic: ${topic}`);
};

export const startKafkaConsumer = async (onMessage) => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());

      await onMessage({
        topic,
        partition,
        event,
      });
    },
  });
};

export const disconnectKafkaConsumer = async () => {
  await consumer.disconnect();
  console.log("Kafka Consumer Disconnected");
};