import { updateUserSchema } from "../../schemas/auth.schema.js";
import {
  deleteAllUsers,
  deleteUser,
  findAllUsers,
  findUser,
  updateUserExtended,
  validateRequest,
} from "../../services/auth.services.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../utils/cookies.util.js";
import { signJwt } from "../../utils/jwt.utils.js";
import { sendMagicLink } from "../../utils/magic-link.utils.js";
import { validationErrorBuilder } from "../../utils/validation.util.js";

export async function httpUpdateUser(req, res) {
  try {
    const { id } = req.user;
    const validation = updateUserSchema.safeParse(req.body);

    if (!validation.success) {
      const { errors } = validation.error;
      console.error({ updateUserSchemaError: errors });
      const message = validationErrorBuilder(errors);
      return res.status(400).json({ success: false, message });
    }

    const { data } = validation;
    const updatedUser = await updateUserExtended({ _id: id }, data);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist." });
    }
    console.log(updatedUser);

    const userJwt = { id: updatedUser._id, email: updatedUser.email };
    await sendMagicLink(req, userJwt);
    const accessToken = await signJwt(
      { user: userJwt },
      { expiresIn: accessTokenOptions.maxAge }
    );
    res.cookie("accessToken", accessToken, accessTokenOptions);
    const refreshToken = await signJwt(
      { user: userJwt },
      { expiresIn: refreshTokenOptions.maxAge }
    );
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: { ...updatedUser, password: null },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpDeleteUser(req, res) {
  try {
    const { id } = req.user;

    const user = await deleteUser({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    return res.status(204).json({
      success: true,
      message: "User deleted successfully.",
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
}

export async function httpDeleteAllUsers(req, res) {
  try {
    const deleted = await deleteAllUsers();
    return res.status(204).json({
      success: true,
      message: "Successfully deleted all users.",
      data: { deleted },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function httpViewUser(req, res) {
  try {
    const { id } = req.user;
    const user = await findUser({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: { user },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving user." });
  }
}

export async function httpViewAllUsers(req, res) {
  try {
    const { users, usersCount, cursor } = await findAllUsers(req.query?.cursor);

    if (!users) {
      return res
        .status(200)
        .json({ success: false, message: "Yet to register a user." });
    }

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: { users, usersCount, cursor },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving all users on the system.",
    });
  }
}
