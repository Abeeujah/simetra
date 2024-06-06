import { AddressModel } from "../models/shopping/address.model.js";
import { CartItemModel } from "../models/shopping/cart-item.model.js";
import { OrderModel } from "../models/shopping/order.model.js";

export async function checkout(id, items) {
  try {
    const cartItemPrices = await Promise.all(
      items.map(async ({ itemId, quantity }) => {
        const cartItem = await CartItemModel.findById(itemId).select(
          "productId"
        );
        const product = await cartItem.populate({
          path: "productId",
          select: { price: 1 },
        });
        cartItem.quantity = quantity;
        await cartItem.save();
        return { price: product.productId.price * quantity };
      })
    );
    // Calculate total amount by summing prices from the results
    const amount = cartItemPrices.reduce((sum, { price }) => sum + price, 0);

    // Create order
    const order = await OrderModel.create({
      placedBy: id,
      items: items.map(({ itemId }) => itemId),
      amount,
    });

    return order.toJSON();
  } catch (error) {
    console.error({ checkoutError: error });
    throw new Error(error.message);
  }
}

export async function shippingAddress(orderId, address) {
  try {
    const shippingAddress = await AddressModel.create(address);
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        shippingAddress: shippingAddress._id,
      },
      { new: true }
    );
    return order.toJSON();
  } catch (error) {
    console.error({ shippingAddressError: error });
    throw new Error(error.message);
  }
}

export async function amountQuery(orderId) {
  try {
    const amount = await OrderModel.findById(orderId).select("amount");
    return amount;
  } catch (error) {
    console.error({ amountQueryError: error });
    throw new Error(error.message);
  }
}

export async function paymentUpdate(orderId, payment) {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: "PLACED",
        payment: { ...payment, success: true },
      },
      { new: true }
    );
    return order.toJSON();
  } catch (error) {
    console.error({ paymentUpdateError: error });
    throw new Error(error.message);
  }
}

export async function orderCompleted(orderId) {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: "COMPLETED",
      },
      { new: true }
    );
    return order.toJSON();
  } catch (error) {
    console.error({ orderCompletedError: error });
    throw new Error(error.message);
  }
}

export async function orderHistory(filter) {
  try {
    const { placedBy, cursor } = filter;
    const filterQuery = cursor ? { _id: { $lt: cursor } } : {};

    const orders = await OrderModel.find(
      { ...filterQuery, placedBy },
      { _id: 1, createdAt: 1, status: 1, items: { $slice: 1 } }
    )
      .sort({ _id: -1 })
      .limit(20)
      .populate({
        path: "items",
        select: "productId -_id",
        populate: {
          path: "productId",
          select: "productImageI seller -_id",
          populate: { path: "seller", select: "storeName -_id" },
        },
      });

    if (!orders.length) {
      return false;
    }

    const pointer = orders.length;
    const newCursor = pointer ? orders[pointer - 1]._id : "";
    return { orders, cursor: newCursor };
  } catch (error) {
    console.error({ orderHistoryError: error });
    throw new Error(error.message);
  }
}

export async function completedOrders(filter) {
  try {
    const { placedBy, cursor } = filter;
    const filterQuery = cursor ? { _id: { $lt: cursor } } : {};

    const orders = await OrderModel.find(
      {
        ...filterQuery,
        placedBy,
        status: "COMPLETED",
      },
      { createdAt: 1, items: 1 }
    )
      .sort({ _id: -1 })
      .limit(20)
      .populate({
        path: "items",
        select: "productId -_id",
        populate: {
          path: "productId",
          select: "productImageI name price _id",
        },
      });
    const pointer = orders.length;
    const newCursor = pointer ? orders[pointer - 1]._id : "";
    return { orders, cursor: newCursor };
  } catch (error) {
    console.error({ orderHistoryError: error });
    throw new Error(error.message);
  }
}
