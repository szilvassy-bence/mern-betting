import express from "express";
import { createConnectionString, getConnectionState, isConnected, isDisconnected, connect, disconnect } from "./db/connection/connection.js";
import {logger} from "./middlewares/logger.js";
import mongoose from "mongoose";
import countryRouter from "./routes/country-router.js"

const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(logger);

// API Routes
app.use("/api/countries", countryRouter)

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