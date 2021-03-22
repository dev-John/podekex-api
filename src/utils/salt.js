import { pbkdf2Sync } from "pbkdf2";
import { randomBytes } from "crypto";

export function hashPassword(password) {
  var salt = randomBytes(128).toString("base64");
  var iterations = 10000;
  var hash = pbkdf2Sync(password, salt, iterations, 32, "sha512");

  return {
    salt,
    hash,
    iterations,
  };
}

export function isPasswordCorrect(
  savedHash,
  savedSalt,
  savedIterations,
  passwordAttempt
) {
  return (
    savedHash ==
    pbkdf2Sync(
      passwordAttempt,
      savedSalt,
      parseInt(savedIterations),
      32,
      "sha512"
    )
  );
}
