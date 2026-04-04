const FIRESTORE_ERROR_MESSAGES: Record<string, string> = {
  "permission-denied":
    "Draft saved on this device, but your account cannot save to the dashboard yet.",
  unauthenticated:
    "Draft saved on this device. Sign in again to save drafts to your dashboard.",
};

function getErrorCode(error: unknown) {
  if (!error || typeof error !== "object") return "";
  return "code" in error && typeof error.code === "string" ? error.code : "";
}

export function canFallbackToLocalDraftSave(error: unknown) {
  const code = getErrorCode(error);
  return code === "permission-denied" || code === "unauthenticated";
}

export function getFirestoreErrorMessage(error: unknown) {
  const code = getErrorCode(error);
  if (code && FIRESTORE_ERROR_MESSAGES[code]) {
    return FIRESTORE_ERROR_MESSAGES[code];
  }

  return "We couldn't save this draft to your dashboard. Your work is still saved on this device.";
}
