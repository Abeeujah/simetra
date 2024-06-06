import { SellerModel } from "../models/seller/seller.model.js";

export async function setupSeller(sellerDto, user) {
  try {
    const seller = await SellerModel.create(sellerDto);

    if (!seller) {
      return false;
    }

    user.seller = seller._id;
    await user.save();

    const { storeName, itemsType, coverBanner, profilePhoto } = seller;

    return { storeName, itemsType, coverBanner, profilePhoto };
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

export async function deleteSeller(sellerId) {
  try {
    const seller = await SellerModel.findByIdAndDelete(sellerId);

    if (!seller) {
      return false;
    }

    return seller.toJSON();
  } catch (error) {
    console.error({ deleteSellerError: error });
    throw new Error(error.message);
  }
}
