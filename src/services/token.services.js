import { TokenModel } from "../models/auth/token.model.js";

// Save, Retrieve, Delete
export async function saveToken(tokenDto) {
  try {
    const token = await TokenModel.create(tokenDto);
    if (!token) {
      return false;
    }
    return token.toJSON();
  } catch (error) {
    console.error({ saveTokenError: error });
    throw new Error(error.message);
  }
}

export async function retrieveToken(token) {
  try {
    const retrieved = await TokenModel.findOne({ token });
    if (!retrieved) {
      return false;
    }
    return retrieved.toJSON();
  } catch (error) {
    console.error({ retrieveTokenError: error });
    throw new Error(error.message);
  }
}

export async function deleteToken(id) {
  try {
    const token = await TokenModel.findByIdAndDelete(id);
    if (!token) {
      return false;
    }
    return token.toJSON();
  } catch (error) {
    console.error({ deleteTokenError: error });
    throw new Error(error.message);
  }
}
