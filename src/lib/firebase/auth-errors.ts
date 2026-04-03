const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential":
    "That email or password was not recognized. Please try again.",
  "auth/invalid-email": "Enter a valid email address and try again.",
  "auth/email-already-in-use":
    "That email address is already in use. Try signing in instead.",
  "auth/popup-closed-by-user":
    "Google sign-in was canceled before it finished.",
  "auth/popup-blocked":
    "Your browser blocked the Google sign-in popup. Allow popups and try again.",
  "auth/network-request-failed":
    "Authentication could not reach Firebase. Check your connection and try again.",
};

function getErrorCode(error: unknown) {
  if (!error || typeof error !== "object") return "";
  return "code" in error && typeof error.code === "string" ? error.code : "";
}

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") return "";
  return "message" in error && typeof error.message === "string"
    ? error.message
    : "";
}

export function getAuthErrorMessage(error: unknown) {
  const code = getErrorCode(error);
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  const message = getErrorMessage(error);
  if (
    /Illegal url for new iframe/i.test(message) ||
    (message.includes("%0A") && message.includes("/__/auth/iframe"))
  ) {
    return "Google sign-in is temporarily unavailable because the Firebase authentication settings are invalid. Please check the deployed Firebase environment variables and try again.";
  }

  return "Authentication failed. Please try again.";
}
