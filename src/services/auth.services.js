import { UserModel } from "../models/auth/user.model.js";

// Create user
export async function createUser(userDto) {
  try {
    const createdUser = await UserModel.create(userDto);

    if (!createdUser) {
      return false;
    }

    const { _id, email } = createdUser;
    return { _id, email };
  } catch (error) {
    console.error({ dbError: error });
    if (error.keyValue) {
      throw new Error(
        `User with ${Object.entries(error.keyValue)} already exists.`
      );
    }
    throw new Error(error.message);
  }
}

// Update user address, phone and type
export async function updateProfile(id, dto) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, dto);
    if (!user) {
      return false;
    }
    return user.toJSON();
  } catch (error) {
    console.error({ updateProfileError: error });
    throw new Error(error.message);
  }
}

// Find user by email
export async function findUserByEmail(email, full) {
  try {
    const user = await UserModel.findOne({ email });

    if (full) {
      return user.toJSON();
    }

    return { name: user.name, email };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Retrieve user by email failed");
  }
}

// Find all users
export async function findAllUsers(next) {
  try {
    const filterQuery = {};

    if (next) {
      filterQuery._id = { $lt: next };
    }

    const usersCount = await UserModel.countDocuments();

    if (!usersCount) {
      return false;
    }

    const users = await UserModel.find(filterQuery, { __v: 0, password: 0 })
      .sort({
        _id: -1,
      })
      .limit(20);

    const pointer = users.length;
    const cursor = pointer ? users[users.length - 1]._id : "";

    return { users, usersCount, cursor };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to retrieve users.");
  }
}

// Find a user
export async function findUser(filter) {
  try {
    const user = await UserModel.findOne(filter);

    if (!user) {
      return false;
    }

    const { name, email, phone, address, gender } = user;
    return { name, email, phone, address, gender };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to retrieve user record.");
  }
}

// Update user
export async function updateUser(updateUserDto) {
  try {
    const { email, password } = updateUserDto;
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );

    return { name: user.name, email };
  } catch (error) {
    console.error({ dbError: error });
    throw new Error("Failed to update user");
  }
}

export async function updateUserExtended(filter, update) {
  try {
    const user = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!user) {
      return false;
    }

    const { name, email, phone, address, gender } = user;
    return { name, email, phone, address, gender };
  } catch (error) {
    console.error({ updateUserExtendedError: error });
    if (error.keyValue) {
      const duplicate = JSON.stringify(error.keyValue);
      throw new Error(`User with ${duplicate} already exists.`);
    }
    throw new Error(error.message);
  }
}

// Delete a user
export async function deleteUser(filter) {
  try {
    const user = await UserModel.findOneAndDelete(filter);

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    console.error({ deleteUserError: error });
    throw new Error("Failed to delete user");
  }
}

// Delete all users
export async function deleteAllUsers() {
  try {
    const deleted = await UserModel.deleteMany();
    return deleted;
  } catch (error) {
    console.error({ deleteAllUsersError: error.message });
    throw new Error(error.message);
  }
}

// Validate write operations to user model
export async function validateRequest(email) {
  const user = await findUserByEmail(email, true);
  return user._id;
}

// Exclude sensitive fields from returned objects
export function exclude(entity, keys) {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key))
  );
}
