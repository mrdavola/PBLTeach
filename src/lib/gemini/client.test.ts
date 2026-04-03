import test from "node:test";
import assert from "node:assert/strict";

import { getGeminiModelName } from "./client.ts";

test("defaults to a currently supported Gemini model", () => {
  assert.equal(getGeminiModelName({}), "gemini-2.5-flash");
});

test("allows overriding the Gemini model via environment", () => {
  assert.equal(
    getGeminiModelName({ GEMINI_MODEL: "gemini-2.5-pro" }),
    "gemini-2.5-pro"
  );
});
