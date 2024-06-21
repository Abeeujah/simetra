import {
  sellerSetupSchema,
  updateSellerSchema,
} from "../../schemas/seller.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import {
  deleteSeller,
  getAllSellers,
  getSellerById,
  setupSeller,
  updateSeller,
} from "../../services/seller.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpSellerSetup(req, res) {
  // Get the user from the session
  const { email } = req.user;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const { data } = req;

  const sellerSetupDto = { ...data, ...uploadMapping };

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
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateSeller(req, res) {
  const { id } = req.user;
  const { uploadMapping } = res.locals;
  const { data } = req;

  try {
    const updateSellerDto = { ...data, ...uploadMapping };

    const seller = await updateSeller({ userProfile: id }, updateSellerDto);

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
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteSeller(req, res) {
  const { id } = req.user;

  try {
    const seller = await deleteSeller({ userProfile: id });

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
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpGetAllSellers(req, res) {
  try {
    const { sellers, cursor } = await getAllSellers(req.query?.cursor);
    if (!cursor) {
      return res
        .status(404)
        .json({ success: false, message: "No sellers available to display." });
    }
    return res.status(200).json({
      success: true,
      message: "Sellers retrieved successfully.",
      data: { sellers },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpValidateSellerPayload(req, res, next) {
  // Validate req.body
  const validator =
    req.method === "POST" ? sellerSetupSchema : updateSellerSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ httpValidateSellerPayloadError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  req.data = validation.data;
  return next();
}
