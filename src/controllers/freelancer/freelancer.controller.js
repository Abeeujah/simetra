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
  if (!req.user && !res.locals.user) {
    // Get the user from the session
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const user = req.user || res.locals.user;
  const { email } = user;

  // Validate the incoming request body
  const validation = registerFreelancerSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ validationError: validation.error.errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const { bio, experienceYears, serviceType, externalLink, officeAddress } =
    validation.data;

  // Extract the image urls from res.locals
  const { uploadMapping } = res.locals;
  const {
    profilePhoto,
    coverBanner,
    imageReferenceI,
    imageReferenceII,
    imageReferenceIII,
    imageReferenceIV,
  } = uploadMapping;

  // Create the freelancer DTO
  const freelancerDto = {
    serviceType,
    bio,
    experienceYears,
    officeAddress,
    externalLink: externalLink || undefined,
    userEmail: email,
    profilePhoto,
    coverBanner,
    imageReferenceI,
    imageReferenceII,
    imageReferenceIII,
    imageReferenceIV,
  };

  try {
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
    return res.status(500).json({
      success: false,
      message:
        "Some internal server error occured when processing your request",
    });
  }
}

export async function httpGetAllFreelancers(req, res) {
  try {
    const { freelancers, cursor } = await getAllFreelancers(req.query?.cursor);

    if (!freelancers.length && !cursor) {
      return res.status(204).json({
        success: false,
        message: "No more freelancers listing available to display.",
      });
    }

    if (!freelancers.length) {
      return res
        .status(204)
        .json({ success: false, message: "No freelancer available." });
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
  const profilePhoto = uploadMapping?.profilePhoto;
  const coverBanner = uploadMapping?.coverBanner;

  try {
    const validation = updateFreelancerSchema.safeParse(req.body);

    if (!validation.success) {
      const { errors } = validation.error;
      console.error({ freelancerUpdate: errors });
      const message = validationErrorBuilder(errors);
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const { data } = validation;
    const updateFreelancerDto = {
      ...data,
      ...uploadMapping,
      profilePhoto,
      coverBanner,
    };

    const freelancer = await updateFreelancer({ _id: id }, updateFreelancerDto);

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

    return res.status(200).json({
      success: true,
      message: "Delete freelancer successful.",
      data: { freelancer },
    });
  } catch (error) {
    console.error({ serverError: error });
    return res.status(500).json({ success: false, message: error.message });
  }
}
