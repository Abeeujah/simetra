import { UserModel } from "../models/auth/user.model.js";
import { SellerModel } from "../models/seller/seller.model.js";

export async function setupSeller(sellerDto, user) {
  try {
    const seller = await SellerModel.create(sellerDto);

    if (!seller) {
      return false;
    }

    await UserModel.findOneAndUpdate({ _id: user._id }, { seller: seller._id });

    return seller.toJSON();
  } catch (error) {
    console.error({ setupSellerError: error });
    if (error.keyValue) {
      const duplicate = JSON.stringify(error.keyValue);
      throw new Error(`User with ${duplicate} already exists.`);
    }
    throw new Error("Failed to setup seller profile.");
  }
}

export async function getSellerById(sellerId) {
  try {
    const seller = await SellerModel.findById(sellerId);

    if (!seller) {
      return false;
    }

    return seller.toJSON();
  } catch (error) {
    console.error({ getSellerByIdError: error });
    throw new Error("Failed to retrieve seller by ID.");
  }
}

export async function updateSeller(filter, update) {
  try {
    const seller = await SellerModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!seller) {
      return false;
    }

    return seller.toJSON();
  } catch (error) {
    console.error({ updateSellerError: error });
    throw new Error(error.message);
  }
}

export async function deleteSeller(filter) {
  try {
    const seller = await SellerModel.findOneAndDelete(filter);

    if (!seller) {
      return false;
    }

    return seller.toJSON();
  } catch (error) {
    console.error({ deleteSellerError: error });
    throw new Error(error.message);
  }
}

export async function getAllSellers(next) {
  try {
    const filterQuery = {};

    if (next) {
      filterQuery._id = { $lt: next };
    }

    const sellers = await SellerModel.find(filterQuery, {
      storeName: 1,
      itemsType: 1,
      profilePhoto: 1,
    })
      .sort({ _id: -1 })
      .limit(20);

    const pointer = sellers.length;
    const cursor = pointer ? sellers[pointer - 1]._id : "";

    return { sellers, cursor };
  } catch (error) {
    console.error({ getAllSellersError: error });
    throw new Error(error.message);
  }
}
