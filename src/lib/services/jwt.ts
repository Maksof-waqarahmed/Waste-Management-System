import jwt from "jsonwebtoken";

const secretKey: string = process.env.JWT_SECRET || "123143454325";

export const generateJwtToken = (
  payload: Record<string, any>,
  expiresIn: `${string}m` = "15m"
) => {
  return new Promise<string>((resolve, reject) => {
    try {
      payload.expiresIn = expiresIn;
      const token = jwt.sign(payload, secretKey, { expiresIn });
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

export const verifyJWT = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, secretKey);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
};
