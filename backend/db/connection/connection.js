import path from "path";
import mongoose from "mongoose";
import { config } from "dotenv";
import { fileURLToPath  } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
  path: path.join(__dirname, "../../config/.env"),
  override: true
});

const { MONGO_URL } = process.env;

//const MONGO_URL = "mongodb+srv://benceszilvassy91:dedvex-quCtax-1zubbo@cluster0.6usurse.mongodb.net/sportDb"

let connection;

export function createConnectionString(mongoURL) {
  return MONGO_URL.replace("<username>", USERNAME)
    .replace("<password>", PASSWORD)
    .replace("<cluster>", CLUSTER)
    .replace("<dbname>", DBNAME);
}

export function getConnectionState(connection) {
  return {
    state: mongoose.STATES[connection.connection.readyState],
    database: connection?.connections[0]?.name,
  };
}

export function isConnected(database) {
  const status = getConnectionState(connection);
  return status.state === "connected" && status.database === database;
}

export function isDisconnected(database) {
  const status = getConnectionState(connection);
  return status.state === "disconnected" && status.database === database;
}

export async function connect() {
  connection = await mongoose.connect(MONGO_URL);
}

export function disconnect() {
  return connection.disconnect();
}

