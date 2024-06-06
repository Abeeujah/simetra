import config from "../../config/defaults.js";

export const accessTokenTtl = config["accessTokenTtl"];
export const refreshTokenTtl = config["refreshTokenTtl"];
export const otpTokenTtl = config["otpTokenTtl"];
const environment = config["environment"];

export const accessTokenOptions = {
  maxAge: accessTokenTtl,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "strict",
  secure: environment === "production",
};

export const refreshTokenOptions = {
  ...accessTokenOptions,
  maxAge: refreshTokenTtl,
};

export const otpTokenOptions = {
  ...accessTokenOptions,
  maxAge: otpTokenTtl,
};
