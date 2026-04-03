import test from "node:test";
import assert from "node:assert/strict";

import { getErrorMessageFromResponse } from "./error-response.ts";

test("returns API json error messages when status text is blank", async () => {
  const response = new Response(
    JSON.stringify({ error: "GEMINI_API_KEY is not set" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  );

  const message = await getErrorMessageFromResponse(response, "Generation failed");

  assert.equal(message, "Generation failed: GEMINI_API_KEY is not set");
});

test("falls back to status text when no body message exists", async () => {
  const response = new Response("", {
    status: 503,
    statusText: "Service Unavailable",
  });

  const message = await getErrorMessageFromResponse(response, "Generation failed");

  assert.equal(message, "Generation failed: Service Unavailable");
});
