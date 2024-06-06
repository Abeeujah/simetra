import {
  addItemToCart,
  removeItemFromCart,
  viewCart,
} from "../../services/cart.services.js";

export async function httpAddToCart(req, res) {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const cart = await addItemToCart(id, productId);
    return res.status(201).json({
      success: true,
      message: "Added item successfully.",
      data: { cart },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewCart(req, res) {
  try {
    const { id } = req.user;
    const cart = await viewCart(id);

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is currently empty, start shopping.",
        data: { cart },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully.",
      data: { cart },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpRemoveItemFromCart(req, res) {
  try {
    const { id } = req.user;
    const { itemId } = req.params;
    const cart = await removeItemFromCart(id, itemId);

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "No item removed.",
        data: { cart },
      });
    }
    return res.status(200).json({
      success: true,
      message: "Removed item from cart successfully.",
      data: { cart },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
