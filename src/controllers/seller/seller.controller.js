import {
  sellerSetupSchema,
  updateSellerSchema,
} from "../../schemas/seller.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import {
  deleteSeller,
  getSellerById,
  setupSeller,
  updateSeller,
} from "../../services/seller.services.js";
import { validateRequest } from "../../services/user-info.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpSellerSetup(req, res) {
  // Get the user from the session
  if (!req.user && !res.locals.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { coverBanner, profilePhoto } = uploadMapping;

  // Validate the request body
  const validation = sellerSetupSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ sellerSetupSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const { itemsType, location, storeName } = validation.data;

  const sellerSetupDto = {
    itemsType,
    location,
    storeName,
    coverBanner,
    profilePhoto,
  };

  try {
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user credential." });
    }

    const seller = await setupSeller(
      {
        ...sellerSetupDto,
        userProfile: user._id,
      },
      user
    );

    if (!seller) {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occured, please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Success creating the profile",
      data: { seller },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}

export async function httpGetSellerById(req, res) {
  const { sellerId } = req.params;
  try {
    const seller = await getSellerById(sellerId);

    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Seller profile found successfully.",
      data: { seller },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateSeller(req, res) {
  const { sellerId } = req.params;
  const { email } = req.user;
  const { uploadMapping } = res.locals;
  const profilePhoto = uploadMapping?.profilePhoto?.[0];
  const coverBanner = uploadMapping?.coverBanner?.[0];

  try {
    const whoAmI = await validateRequest(email, "seller");

    if (whoAmI.toString() !== sellerId) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden to perform this action." });
    }

    const validation = updateSellerSchema.safeParse(req.body);

    if (!validation.success) {
      const { errors } = validation.error;
      console.error({ updateSellerSchemaError: errors });
      const message = validationErrorBuilder(errors);
      return res.status(400).json({ success: false, message });
    }

    const { data } = validation;
    const updateSellerDto = { ...data, profilePhoto, coverBanner };

    const seller = await updateSeller({ _id: sellerId }, updateSellerDto);

    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Update seller successful.",
      data: { seller },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteSeller(req, res) {
  const { sellerId } = req.params;
  const { email } = req.user;

  try {
    const whoAmI = await validateRequest(email, "seller");

    if (whoAmI.toString() !== sellerId) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden to perform this action." });
    }

    const seller = await deleteSeller(sellerId);

    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Seller profile deleted successfully",
      data: { seller },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}
