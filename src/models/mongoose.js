import mongoose from "mongoose";
import defaults from "../../config/defaults.js";

const dbUri = defaults["dbUri"];

mongoose.set("strictQuery", true);
mongoose.connection.once("open", () => {
  console.log("Database Connection Successful");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

export async function mongoConnect() {
  await mongoose.connect(dbUri);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

export async function getConnectionDetails() {
  // Healthz check route documentation
  // Check connection state directly
  const connected = mongoose.connection.readyState === 1;

  // Early return for disconnected state
  if (!connected){
    throw new Error("Database is disconnected");
  }

  try {
    // Measure latency only if connected
    const start = Date.now();
    await mongoose.connection.db.command({ ping: 1 });
    const end = Date.now();
    const latency = end - start;
    return { connected, latency: `${latency}ms` };
  } catch (error) {
    console.error("Error getting connection latency:", error);
    throw new Error(error.message);
  }
}
