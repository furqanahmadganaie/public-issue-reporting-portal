import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Issue Service running on port ${PORT}`);
});