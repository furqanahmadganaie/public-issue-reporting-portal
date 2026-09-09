import dotenv from "dotenv";

dotenv.config();

const {
  connectKafkaConsumer,
  subscribeToTopic,
  startKafkaConsumer,
} = await import("@portal/kafka");

const {
  sendIssueCreatedEmail,
  sendIssueAssignedEmail,
  sendIssueStatusEmail,
  sendNewIssueOfficerEmail,
} = await import("./services/email.service.js");

const startNotificationService = async () => {
  try {
    await connectKafkaConsumer();

    await subscribeToTopic("issue.created");
    await subscribeToTopic("issue.assigned");
    await subscribeToTopic("issue.updated");

    await startKafkaConsumer(async ({ topic, event }) => {
      console.log("Kafka Event Received");
      console.log("Topic:", topic);
      console.log("Event:", event);

      // --------------------------------
      // NEW ISSUE
      // Citizen + Officer
      // --------------------------------
      if (event.event === "ISSUE_CREATED") {
        // Email to CITIZEN
        await sendIssueCreatedEmail({
          email: event.citizenEmail,
          firstName: event.citizenName,
          issueId: event.issueId,
          title: event.title,
        });

        // Email to OFFICER
        await sendNewIssueOfficerEmail({
          citizenName: event.citizenName,
          citizenEmail: event.citizenEmail,
          issueId: event.issueId,
          title: event.title,
          village: event.village,
          address: event.address,
        });
      }

      // --------------------------------
      // ISSUE ASSIGNED
      // Citizen ONLY
      // --------------------------------
      if (event.event === "ISSUE_ASSIGNED") {
        await sendIssueAssignedEmail({
          email: event.citizenEmail,
          issueId: event.issueId,
          title: event.title,
        });
      }

      // --------------------------------
      // STATUS UPDATED
      // Citizen ONLY
      // --------------------------------
      if (
        event.event === "ISSUE_IN_PROGRESS" ||
        event.event === "ISSUE_RESOLVED"
      ) {
        await sendIssueStatusEmail({
          email: event.citizenEmail,
          issueId: event.issueId,
          title: event.title,
          status:
            event.event === "ISSUE_IN_PROGRESS"
              ? "In Progress"
              : "Resolved",
          remark: event.remark,
        });
      }
    });
  } catch (error) {
    console.error("Failed to start Notification Service:", error);
    process.exit(1);
  }
};

startNotificationService();