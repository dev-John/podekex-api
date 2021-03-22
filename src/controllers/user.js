import speakeasy from "speakeasy";
import { User } from "../models/index.js";
import { hashPassword, isPasswordCorrect } from "../utils/salt.js";

export function signup({ name, email, password }) {
  const { salt, hash, iterations } = hashPassword(password);
  const secret = speakeasy.generateSecret();

  return User.create({
    name,
    email,
    salt,
    hash,
    iterations,
    tempSecret: secret.base32,
  }).catch((err) => {
    console.error(err);
    throw new Error("Não foi possível cadastrar o usuário");
  });
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).orFail(() => {
    throw new Error("Email ou senha incorretos");
  });

  const { hash, salt, iterations } = user;

  if (isPasswordCorrect(hash, salt, iterations, password)) {
    const otpAuthUrl = `otpauth://totp/SecretKey?secret=${
      user.tempSecret || user.secret
    }`;
    return { user, otpAuthUrl };
  } else throw new Error("Email ou senha incorretos");
}

export async function verifyUser(userId, answer) {
  const user = await User.findById(userId).orFail(() => {
    throw new Error("Esse usuário não existe!");
  });

  const secret = user.tempSecret;

  if (secret) {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token: String(answer),
      window: 6,
    });

    if (verified) {
      // Update user data

      await User.findByIdAndUpdate(userId, {
        tempSecret: "",
        secret: user.tempSecret,
      });

      // retornar jwt ou algo do tipo
      return validateToken(secret, answer);
    } else {
      return { validated: false };
    }
  } else {
    return validateToken(user.secret, answer);
  }
}

async function validateToken(secret, token) {
  const tokenValidates = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 6,
  });

  if (tokenValidates) {
    return { validated: true };
  } else {
    return { validated: false };
  }
}
