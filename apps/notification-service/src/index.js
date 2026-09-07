import dotenv from "dotenv";


dotenv.config();

const  {
  connectKafkaConsumer,
  subscribeToTopic,
  startKafkaConsumer,
} = await import("@portal/kafka");

const {
  sendIssueCreatedEmail,
} = await import("./services/email.service.js");

const startNotificationService = async () => {
  try {
    await connectKafkaConsumer();

    await subscribeToTopic("issue.created");

    await startKafkaConsumer(async ({ topic, event }) => {
      console.log("Kafka Event Received");
      console.log("Topic:", topic);
      console.log("Event:", event);

      // Notification logic will be added here later.
       if (event.event === "ISSUE_CREATED") {
    await sendIssueCreatedEmail({
      email: event.citizenEmail,
      issueId: event.issueId,
      title: event.title,
    });
  }


    });

  } catch (error) {
    console.error(
      "Failed to start Notification Service:",
      error
    );

    process.exit(1);
  }
};

startNotificationService();