import {
  createProductSchema,
  queryProductSchema,
  updateProductSchema,
} from "../../schemas/product.schema.js";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsBySellerId,
  updateProduct,
} from "../../services/product.services.js";
import { getSellerById } from "../../services/seller.services.js";
import { validateRequest } from "../../services/user-info.services.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpCreateProduct(req, res) {
  // Pick seller out of request params
  const { sellerId } = req.params;

  const { email } = req.user;

  // Validate request
  const validation = createProductSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ createProductSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const { price, name, description, category } = validation.data;

  // Pull product images from res.locals
  const { uploadMapping } = res.locals;

  // Create the product
  try {
    // Ensure the seller is valid
    const seller = await getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "No seller with the specified credential.",
      });
    }

    // Ensure the seller is the one making the request
    const whoAmI = await validateRequest(email, "seller");

    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to perform this action.",
      });
    }

    // Create product DTO
    const productDto = {
      price,
      name,
      description,
      category,
      productImageI: uploadMapping?.productImageI,
      productImageII: uploadMapping?.productImageII,
      productImageIII: uploadMapping?.productImageIII,
      productImageIV: uploadMapping?.productImageIV,
      productImageV: uploadMapping?.productImageV,
      seller: sellerId,
    };

    // Create the product
    const product = await createProduct(productDto);

    if (!product) {
      throw new Error(`Failed to add ${name} to inventory`);
    }

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewSellerProducts(req, res) {
  const { sellerId } = req.params;

  try {
    const products = await getProductsBySellerId(sellerId);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Seller does not have any available product.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller's products retrieved successfully.",
      data: { products },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewProductById(req, res) {
  // Returns the product and the seller's basic details
  const { productId } = req.params;

  try {
    // Fetch and Validate the product exists
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product with the provided credential does not exist.",
      });
    }

    // Populate the seller
    await product.populate("seller");

    // Return the View details
    const { name, price, category, description } = product;
    const { storeName, location, rating } = product.seller;

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully.",
      data: {
        product: {
          name,
          price,
          category,
          description,
          storeName,
          location,
          rating,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewAllProducts(req, res) {
  const validation = queryProductSchema.safeParse(req.query);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ queryProductSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  const { data } = validation;

  try {
    const { products, cursor } = await getAllProducts(data);

    if (!products.length && !cursor) {
      return res.status(200).json({
        success: false,
        message: "No more products listing available to display",
      });
    }

    if (!products.length) {
      return res.status(200).json({
        success: false,
        message: "No product listing available to display",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      data: { products, cursor },
    });
  } catch (error) {
    return res.status(500).json({ serverError: error.message });
  }
}

export async function httpUpdateProduct(req, res) {
  // User must be authenticated
  const { email } = req.user;
  const { sellerId, productId } = req.params;

  const validation = updateProductSchema.safeParse(req.body);

  if (!validation.success) {
    const { errors } = validation.error;
    console.error({ updateProductSchemaError: errors });
    const message = validationErrorBuilder(errors);
    return res.status(400).json({ success: false, message });
  }

  // Pull product images from res.locals
  const { uploadMapping } = res.locals;

  // Create product DTO
  const updateProductDto = {
    productImageI: uploadMapping?.productImageI,
    productImageII: uploadMapping?.productImageII,
    productImageIII: uploadMapping?.productImageIII,
    productImageIV: uploadMapping?.productImageIV,
    productImageV: uploadMapping?.productImageV,
    ...validation.data,
  };

  try {
    // Ensure the seller is valid
    const seller = await getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "No seller with the specified credential.",
      });
    }

    // Ensure the seller is the one making the request
    const whoAmI = await validateRequest(email, "seller");

    // Ensure authenticated user is the product owner
    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to perform this action.",
      });
    }

    // Update the product
    const product = await updateProduct({ _id: productId }, updateProductDto);

    if (!product) {
      throw new Error(`Failed to update product.`);
    }

    return res.status(200).json({
      success: true,
      message: "Product details updated successfully.",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteProductById(req, res) {
  // User must be authenticated
  const { sellerId, productId } = req.params;
  const { email } = req.user;

  try {
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No product matching this credential.",
      });
    }

    const whoAmI = await validateRequest(email, "seller");

    if (whoAmI.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to perform this action.",
      });
    }

    const deletedProduct = await deleteProductById(productId);
    return res.status(204).json({
      success: false,
      message: "Product deleted successfully",
      data: { deletedProduct },
    });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
}
