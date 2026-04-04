import test from "node:test";
import assert from "node:assert/strict";

import {
  canFallbackToLocalDraftSave,
  getFirestoreErrorMessage,
} from "./firestore-errors.ts";

test("maps Firestore permission errors to a friendly draft save message", () => {
  const error = {
    code: "permission-denied",
    message: "Missing or insufficient permissions.",
  };

  assert.equal(
    getFirestoreErrorMessage(error),
    "Draft saved on this device, but your account cannot save to the dashboard yet."
  );
});

test("treats Firestore permission errors as eligible for local draft fallback", () => {
  assert.equal(
    canFallbackToLocalDraftSave({ code: "permission-denied" }),
    true
  );
});
