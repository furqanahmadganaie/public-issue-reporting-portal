import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectKafkaProducer } from "@portal/kafka";

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectKafkaProducer();

    app.listen(PORT, () => {
      console.log(`Issue Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Issue Service:", error);
    process.exit(1);
  }
};

startServer();