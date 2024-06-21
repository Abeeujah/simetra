import {
  registerFreelancerSchema,
  updateFreelancerSchema,
} from "../../schemas/freelancer.schema.js";
import { findUserByEmail } from "../../services/auth.services.js";
import {
  deleteFreelancer,
  getAllFreelancers,
  getFreelancerByID,
  setupFreelancer,
  updateFreelancer,
} from "../../services/freelancer.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpRegisterFreelancer(req, res) {
  // Extract the validated payload and image urls from res.locals
  const { uploadMapping } = res.locals;
  const { data } = req;

  // Create the freelancer DTO
  const freelancerDto = { ...data, ...uploadMapping };

  try {
    const { email } = req.user;
    const user = await findUserByEmail(email, true);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user credential." });
    }

    const freelancer = await setupFreelancer(
      {
        ...freelancerDto,
        userProfile: user._id,
      },
      user
    );

    if (!freelancer) {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occured, please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Success creating the profile",
      data: { freelancer },
    });
  } catch (error) {
    console.error({ serverError: error.message });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpGetAllFreelancers(req, res) {
  try {
    const { freelancers, cursor } = await getAllFreelancers(req.query?.cursor);

    if (!cursor) {
      return res.status(404).json({
        success: false,
        message: "No freelancer available to display.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Freelancers retrieved successfully.",
      data: { freelancers, cursor },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpGetFreelancerById(req, res) {
  try {
    const { freelancerId } = req.params;
    const { email } = req.user;
    const freelancer = await getFreelancerByID(freelancerId, email);

    if (!freelancer) {
      return res
        .status(404)
        .json({ success: false, message: "Freelancer not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Freelancer retrieved successfully.",
      data: { freelancer },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpUpdateFreelancer(req, res) {
  const { id } = req.user;
  const { uploadMapping } = res.locals;

  try {
    const { data } = req;
    const updateFreelancerDto = {
      ...data,
      ...uploadMapping,
    };

    const freelancer = await updateFreelancer({ userProfile: id }, updateFreelancerDto);

    if (!freelancer) {
      return res
        .status(404)
        .json({ success: false, message: "Freelancer not found." });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated the freelancer profile.",
      data: { freelancer },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteFreelancer(req, res) {
  const { id } = req.user;

  try {
    const freelancer = await deleteFreelancer(id);

    if (!freelancer) {
      return res
        .status(404)
        .json({ success: false, message: "Freelancer not found." });
    }

    return res.status(204).json({
      success: true,
      message: "Delete freelancer successful.",
      data: { freelancer },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpValidateFreelancerPayload(req, res, next) {
  // Validate the incoming request body
  const validator =
    req.method === "POST" ? registerFreelancerSchema : updateFreelancerSchema;
  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ validationError: validation.error.errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  req.data = validation.data;
  return next();
}
