import { ProductModel } from "../models/seller/product.model.js";
import { SellerModel } from "../models/seller/seller.model.js";

export async function createProduct(productDto) {
  try {
    const { seller } = productDto;
    const productOwner = await SellerModel.findById(seller);

    if (!productOwner) {
      throw new Error("No seller matching this specified credential");
    }

    const product = await ProductModel.create(productDto);

    if (!product) {
      throw new Error("Failed to create product");
    }

    productOwner.products.push(product._id);
    await productOwner.save();

    return product.toJSON();
  } catch (error) {
    console.error({ createProductError: error });
    throw new Error(error.message);
  }
}

export async function getProductsBySellerId(sellerId, next) {
  try {
    const filterQuery = { seller: sellerId };

    if (next) {
      filterQuery._id = { $lt: next };
    }

    const products = await ProductModel.find(filterQuery)
      .sort({ _id: -1 })
      .limit(20);

    if (!products.length) {
      return false;
    }

    const pointer = products.length;
    const cursor = pointer ? products[products.length - 1]._id : "";

    return { products, cursor };
  } catch (error) {
    console.error({ getProductsBySellerIdError: error });
    throw new Error("Failed to get seller's products.");
  }
}

export async function getProductById(productId) {
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return false;
    }

    return product.toJSON();
  } catch (error) {
    console.error({ getProductByIdError: error });
    throw new Error(error.message);
  }
}

export async function getAllProducts(data) {
  try {
    const { category, cursor, search } = data;
    const filterQuery = {};

    if (cursor) {
      filterQuery._id = { $lt: cursor };
    }

    if (category) {
      filterQuery.category = category;
    }

    if (search) {
      filterQuery.$text = { $search: search };
    }

    const products = await ProductModel.find({
      ...filterQuery,
    })
      .sort({ _id: -1 })
      .limit(20);

    const pointer = products.length;
    const newCursor = pointer ? products[pointer - 1]._id : "";

    return { products, cursor: newCursor };
  } catch (error) {
    console.error({ getAllProductsError: error });
    throw new Error(error.message);
  }
}

export async function deleteProductById(productId) {
  try {
    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) {
      return false;
    }

    const { name, price, category, description, images } = product;

    return { name, price, category, description, images };
  } catch (error) {
    console.error({ deleteProductByIdError: error });
    throw new Error(error.message);
  }
}

export async function updateProduct(filter, update) {
  try {
    const product = await ProductModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!product) {
      return false;
    }

    const { name, price, category, description, images } = product;

    return { name, price, category, description, images };
  } catch (error) {
    console.error({ updateProductError: error });
    throw new Error(error.message);
  }
}
