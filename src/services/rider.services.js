import { UserModel } from "../models/auth/user.model.js";
import { RiderModel } from "../models/rider/rider.model.js";

export async function setupRider(riderDto, user) {
  try {
    const rider = await RiderModel.create(riderDto);

    if (!rider) {
      return false;
    }

    await UserModel.findOneAndUpdate({ _id: user._id }, { rider: rider._id });

    return rider.toJSON();
  } catch (error) {
    console.error({ dbError: error.message });
    throw new Error("Failed to setup rider profile");
  }
}

export async function getRiderByID(id, email) {
  try {
    const rider = await RiderModel.findById(id).populate({
      path: "userProfile",
      populate: { path: "profile" },
    });

    if (!rider) {
      return false;
    }

    return responseBuilder(rider, email);
  } catch (error) {
    console.error({ getRiderByIDError: error });
    throw new Error(error.message);
  }
}

export async function getRiders(next) {
  try {
    const filterQuery = {};

    if (next) {
      filterQuery._id = { $lt: next };
    }

    const riders = await RiderModel.find(filterQuery, {
      vehicleName: 1,
      vehiclePicture: 1,
    })
      .sort({ _id: -1 })
      .limit(20);

    const pointer = riders.length;
    const cursor = pointer ? riders[pointer - 1]._id : "";

    return { riders, cursor };
  } catch (error) {
    console.error({ getRidersError: error });
    throw new Error(error.message);
  }
}

export async function updateRider(filter, update) {
  try {
    const rider = await RiderModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!rider) {
      return false;
    }

    return rider.toJSON();
  } catch (error) {
    console.error({ updateRiderError: error });
    throw new Error(error.message);
  }
}

export async function deleteRider(filter) {
  try {
    const rider = await RiderModel.findOneAndDelete(filter);

    if (!rider) {
      return false;
    }

    return rider.toJSON();
  } catch (error) {
    console.error({ deleteRiderError: error });
    throw new Error(error.message);
  }
}

function responseBuilder(rider, email) {
  const {
    createdAt,
    vehicleName,
    riderPicture,
    vehiclePicture,
    vehicleModel,
    vehiclePlateNumber,
    totalTrips,
    totalEarnings,
    userProfile,
  } = rider;
  const { name } = userProfile;
  const { gender, address, phone } = userProfile.profile;
  const date = new Date(createdAt);
  const dateRegistered = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const visitorResponse = {
    vehiclePicture,
    vehicleName,
    vehiclePlateNumber,
    dateRegistered,
    riderPicture,
    name,
    gender,
    phone,
  };

  const ownerResponse = {
    name,
    gender,
    phone,
    address,
    dateRegistered,
    vehicleName,
    vehicleModel,
    vehiclePlateNumber,
    totalTrips,
    totalEarnings,
  };
  const response =
    rider.userProfile.email === email ? ownerResponse : visitorResponse;

  return response;
}
