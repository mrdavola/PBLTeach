import test from "node:test";
import assert from "node:assert/strict";

import { POST as legacyPost } from "./route.ts";

test("legacy driving question route redirects to the canonical endpoint", async () => {
  const response = await legacyPost(
    new Request("http://localhost:3000/api/generate/dq", { method: "POST" })
  );

  assert.equal(response.status, 307);
  assert.equal(
    response.headers.get("location"),
    "http://localhost:3000/api/generate/driving-question"
  );
});
