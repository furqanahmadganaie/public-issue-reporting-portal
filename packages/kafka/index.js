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