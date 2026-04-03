import test from "node:test";
import assert from "node:assert/strict";

import { getAuthErrorMessage } from "./auth-errors.ts";

test("maps malformed Firebase iframe errors to a deployment guidance message", () => {
  const message = getAuthErrorMessage(
    new Error(
      "Illegal url for new iframe - https://pblteachwebsite.firebaseapp.com%0A/__/auth/iframe?apiKey=test"
    )
  );

  assert.equal(
    message,
    "Google sign-in is temporarily unavailable because the Firebase authentication settings are invalid. Please check the deployed Firebase environment variables and try again."
  );
});

test("maps invalid login credentials to a friendly message", () => {
  const message = getAuthErrorMessage({
    code: "auth/invalid-credential",
    message: "Firebase: Error (auth/invalid-credential).",
  });

  assert.equal(
    message,
    "That email or password was not recognized. Please try again."
  );
});

test("falls back to a generic auth failure message", () => {
  assert.equal(
    getAuthErrorMessage(new Error("Something unexpected happened")),
    "Authentication failed. Please try again."
  );
});
