import { UserModel } from "../models/auth/user.model.js";
import { FreelancerModel } from "../models/services/freelancer.model.js";

// Create a freelancer record
export async function setupFreelancer(freelancerDto, user) {
  try {
    const freelancer = await FreelancerModel.create(freelancerDto);

    if (!freelancer) {
      return false;
    }

    await UserModel.findByIdAndUpdate(user._id, { freelancer: freelancer._id });

    return freelancer.toJSON();
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to setup freelancer profile.");
  }
}

// Get a freelancer by ID
export async function getFreelancerByID(id, email) {
  try {
    const freelancer = await FreelancerModel.findById(id).populate(
      "userProfile"
    );

    if (!freelancer) {
      return false;
    }

    return responseBuilder(freelancer, email);
  } catch (error) {
    console.error({ getFreelancerByIDError: error });
    throw new Error("Failed to get freelancer.");
  }
}

// Get all freelancers
export async function getAllFreelancers(next) {
  try {
    const filterQuery = {};

    if (next) {
      filterQuery._id = { $lt: next };
    }

    const freelancers = await FreelancerModel.find(filterQuery, { __v: 0 })
      .sort({ _id: -1 })
      .limit(20);

    const pointer = freelancers.length;
    const cursor = pointer ? freelancers[pointer - 1]._id : "";

    return { freelancers, cursor };
  } catch (error) {
    console.error({ getAllFreelancersError: error });
    throw new Error(error.message);
  }
}

// Update a freelancer
export async function updateFreelancer(filter, update) {
  try {
    const freelancer = await FreelancerModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!freelancer) {
      return false;
    }

    return freelancer.toJSON();
  } catch (error) {
    console.error({ updateFreelancerError: error });
    throw new Error("Failed to update freelancer.");
  }
}

// Delete a freelancer
export async function deleteFreelancer(filter) {
  try {
    const freelancer = await FreelancerModel.findByIdAndDelete(filter);

    if (!freelancer) {
      return false;
    }

    return freelancer.toJSON();
  } catch (error) {
    console.error({ deleteFreelancerError: error });
    throw new Error(error.message);
  }
}

function responseBuilder(freelancer, email) {
  const {
    coverBanner,
    profilePhoto,
    rating,
    bio,
    experienceYears,
    serviceType,
    officeAddress,
    externalLink,
    imageReferences,
    totalBookings,
    totalEarnings,
    userProfile,
  } = freelancer;

  const { name, gender, phone, address, createdAt } = userProfile;

  const visitorResponse = {
    coverBanner,
    profilePhoto,
    rating,
    bio,
    experienceYears,
    serviceType,
    officeAddress,
    externalLink,
    imageReferences,
  };

  const date = new Date(createdAt);
  const dateRegistered = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const ownerResponse = {
    coverBanner,
    profilePhoto,
    name,
    gender,
    phone,
    address,
    dateRegistered,
    totalBookings,
    totalEarnings,
  };

  const response =
    freelancer.userProfile.email === email ? ownerResponse : visitorResponse;

  return response;
}
