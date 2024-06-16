import { viewUserProfile } from "../../services/user-info.services.js";

// View User Profile
export async function httpViewUserProfile(req, res) {
  try {
    const { id } = req.user;
    const profile = await viewUserProfile(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message:
          "Profile for this user does not exist, please create to continue.",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: { profile },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
