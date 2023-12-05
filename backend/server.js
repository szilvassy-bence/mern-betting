import express from "express";
import { createConnectionString, getConnectionState, isConnected, isDisconnected, connect, disconnect } from "./db/connection/connection.js";
import {logger} from "./middlewares/logger.js";
import mongoose from "mongoose";
import bettingRouter from "./routes/betting-router.js"
import userRouter from "./routes/user-router.js";
import { query, validationResult } from "express-validator";

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(logger);

// API Betting routes
app.use("/api/betting", bettingRouter)

// API USER routes
app.use("/api/user", userRouter)

// Landing URL
app.get("/", (req, res)=> {
	res.send("Sports Database");
})

async function main() {
  const database = "sportDb";
  await connect();
  const isConnectedValue = isConnected(database);
  if (isConnectedValue) {
    console.log(`Connected to '${database}' database!`);
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } else {
    console.log(`Could not connect to ${database}`);
  }
}

main();