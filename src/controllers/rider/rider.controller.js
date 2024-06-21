import {
  riderSetupSchema,
  updateRiderSchema,
} from "../../schemas/rider.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import {
  deleteRider,
  getRiderByID,
  getRiders,
  setupRider,
  updateRider,
} from "../../services/rider.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpSetupRider(req, res) {
  const { email } = req.user;

  // Extract the image urls from res.locals
  const { data } = req;
  const { uploadMapping } = res.locals;

  // Create the entity
  const riderDto = { ...data, ...uploadMapping };

  try {
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user credential." });
    }

    const rider = await setupRider(
      { ...riderDto, userProfile: user._id },
      user
    );

    if (!rider) {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occured, please try again.",
      });
    }

    // Return
    return res.status(201).json({
      success: true,
      message: "Success creating the profile",
      data: { rider },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({
      success: false,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}

export async function httpViewRiderById(req, res) {
  try {
    const { riderId } = req.params;
    const { email } = req.user;
    const rider = await getRiderByID(riderId, email);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "No rider profile associated with this identifier.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rider retrieved successfully.",
      data: { rider },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewRiders(req, res) {
  try {
    const { riders, cursor } = await getRiders(req.query?.cursor);

    if (!cursor) {
      return res
        .status(404)
        .json({ success: false, message: "No rider available to display." });
    }

    return res.status(200).json({ riders, cursor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateRider(req, res) {
  const { id } = req.user;
  const { uploadMapping } = res.locals;

  try {
    const { data } = req;
    const updateRiderDto = { ...data, ...uploadMapping };

    const rider = await updateRider({ userProfile: id }, updateRiderDto);

    if (!rider) {
      return res
        .status(404)
        .json({ success: false, message: "Rider not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Updated rider successfully.",
      data: { rider },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteRider(req, res) {
  const { id } = req.user;

  try {
    const rider = await deleteRider({ userProfile: id });

    if (!rider) {
      return res
        .status(404)
        .json({ success: false, message: "Rider not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Delete rider successful.",
      data: { rider },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpValidateRiderPayload(req, res, next) {
  // Validate req.body
  const validator =
    req.method === "POST" ? riderSetupSchema : updateRiderSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    const message = validationErrorBuilder(errors);
    cb(JSON.stringify({ success: false, message }), false);
  }

  req.data = validation.data;
  return next();
}
