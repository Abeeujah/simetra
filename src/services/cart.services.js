import { ProductModel } from "../models/seller/product.model.js";
import { CartItemModel } from "../models/shopping/cart-item.model.js";
import { CartModel } from "../models/shopping/cart.model.js";

export async function addItemToCart(owner, item) {
  try {
    // Combine cart retrieval and population in one step
    let cart = await CartModel.findOne({ owner }).populate("items");

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await CartModel.create({ owner });
    }

    // Check if item is already in cart
    const existingItem = cart.items.find(
      (cartItem) => cartItem.productId.toString() === item
    );

    if (!existingItem) {
      // Validate product
      const product = await ProductModel.findById(item);
      if (!product) {
        throw new Error("Product not stocked.");
      }

      // Create and save new cart item
      const cartItem = await CartItemModel.create({
        productId: item,
        cartId: cart._id,
      });
      cart.items.push(cartItem._id);
      await cart.save();
    }

    return cart.toJSON();
  } catch (error) {
    console.error({ addItemToCartError: error });
    throw new Error(error.message);
  }
}

export async function viewCart(owner) {
  try {
    // Fetch user's cart
    // Populate nested fields
    // Select needed fields.
    const cart = await CartModel.findOne({ owner }).populate([
      {
        path: "items",
        select: { _id: 1, productId: 1, quantity: 1 },
        populate: {
          path: "productId",
          select: {
            name: 1,
            price: 1,
            _id: 1,
            seller: 1,
          },
          populate: {
            path: "seller",
            select: { storeName: 1 },
          },
        },
      },
      { path: "owner", select: { name: 1 } },
    ]);

    // Create an array of sellers
    // from all products in the cart
    const sellers = [
      ...new Set(cart.items.map((item) => item.productId.seller)),
    ];

    // Group all products by their seller
    const owners = [];
    for (const seller of sellers) {
      const items = cart.items.filter(
        (item) => item.productId.seller._id === seller._id
      );
      owners.push({ seller, items });
    }

    // Return transformed cart.
    const { _id, createdAt, updatedAt } = cart;
    const korty = { _id, owners, createdAt, updatedAt };
    return korty;
  } catch (error) {
    console.error({ viewCartError: error });
    throw new Error(error.message);
  }
}

export async function removeItemFromCart(owner, item) {
  try {
    const cart = await CartModel.findOne({ owner }).populate("items");

    const existingItem = cart.items.find(
      (cartItem) => cartItem.productId.toString() === item
    );

    if (!existingItem) {
      return false;
    }

    cart.items = cart.items.filter(
      (cartItem) => cartItem.productId.toString() !== item
    );
    await CartItemModel.findByIdAndDelete(existingItem._id);
    await cart.save();

    return cart.toJSON();
  } catch (error) {
    console.error({ removeItemFromCartError: error });
    throw new Error(error.message);
  }
}
