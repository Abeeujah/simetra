import { getConnectionDetails } from "../../models/mongoose.js";

export async function httpHealthzCheck(req, res) {
  try {
    const database = await getConnectionDetails();
    return res.status(200).json({ status: "Healthy", database });
  } catch (error) {
    return res.status(503).json({ success: false, message: error.message });
  }
}
