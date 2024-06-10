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
import { validateRequest } from "../../services/user-info.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpSetupRider(req, res) {
  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.local.user;
  const { email } = user;

  // Validate the request
  const validation = riderSetupSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ riderSetupSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const { location, vehicleName, vehiclePlateNumber, vehicleModel } =
    validation.data;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { riderPicture, vehiclePicture, vehicleDocument } = uploadMapping;

  // Create the entity
  const riderDto = {
    location,
    vehicleName,
    vehiclePlateNumber,
    vehicleModel,
    userEmail: email,
    riderPicture,
    vehiclePicture,
    vehicleDocument,
  };

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
    const { riders, cursor } = getRiders(req.query?.cursor);

    if (!riders.length && !cursor) {
      return res
        .status(200)
        .json({ success: false, message: "No more riders left to display." });
    }

    if (!riders.length) {
      return res
        .status(200)
        .json({ success: false, message: "No riders available." });
    }
    return res.status(200).json({ riders, cursor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateRider(req, res) {
  const { riderId } = req.params;
  const { email } = req.user;
  const { uploadMapping } = res.locals;
  const riderPicture = uploadMapping?.riderPicture?.[0];
  const vehiclePicture = uploadMapping?.vehiclePicture?.[0];
  const vehicleDocument = uploadMapping?.vehicleDocument?.[0];

  try {
    const whoAmI = await validateRequest(email, "rider");

    if (whoAmI.toString() !== riderId) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden to perform this action." });
    }

    const validation = updateRiderSchema.safeParse(req.body);
    if (!validation.success) {
      const { errors } = validation.error;
      console.error({ riderSetupSchemaError: errors });
      const message = validationErrorBuilder(errors);
      return res.status(400).json({ success: false, message });
    }

    const { data } = validation;
    const updateRiderDto = {
      ...data,
      riderPicture,
      vehiclePicture,
      vehicleDocument,
    };

    const rider = await updateRider({ _id: riderId }, updateRiderDto);

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
  const { email } = req.user;
  const { riderId } = req.params;

  try {
    const whoAmI = await validateRequest(email, "rider");

    if (whoAmI.toString() !== riderId) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden to perform this action." });
    }

    const rider = await deleteRider(riderId);

    if (!rider) {
      return res
        .status(404)
        .json({ success: false, message: "Rider not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Delete rider successful.",
      rider,
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}
