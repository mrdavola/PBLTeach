interface ErrorPayload {
  error?: string;
  message?: string;
}

function formatErrorMessage(fallbackPrefix: string, detail: string) {
  return detail ? `${fallbackPrefix}: ${detail}` : fallbackPrefix;
}

export async function getErrorMessageFromResponse(
  response: Response,
  fallbackPrefix: string
) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const payload = (await response.json()) as ErrorPayload;
      if (payload.error) return formatErrorMessage(fallbackPrefix, payload.error);
      if (payload.message) {
        return formatErrorMessage(fallbackPrefix, payload.message);
      }
    } catch {
      // Ignore malformed error bodies and fall through to other strategies.
    }
  }

  try {
    const text = (await response.text()).trim();
    if (text) return formatErrorMessage(fallbackPrefix, text);
  } catch {
    // Ignore unreadable text bodies and fall back to status metadata.
  }

  return formatErrorMessage(
    fallbackPrefix,
    response.statusText || `Request failed with status ${response.status}`
  );
}
