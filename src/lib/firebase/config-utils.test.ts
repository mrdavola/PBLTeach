import test from "node:test";
import assert from "node:assert/strict";

import {
  getFirebaseConfig,
  hasFirebaseCoreConfig,
} from "./config-utils.ts";

test("getFirebaseConfig trims whitespace and strips embedded newlines", () => {
  const config = getFirebaseConfig({
    NEXT_PUBLIC_FIREBASE_API_KEY: " api-key \n",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      "https://pblteachwebsite.firebaseapp.com\n",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: " pblteachwebsite ",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: " bucket \n",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: " sender ",
    NEXT_PUBLIC_FIREBASE_APP_ID: " app-id \n",
  });

  assert.deepEqual(config, {
    apiKey: "api-key",
    authDomain: "pblteachwebsite.firebaseapp.com",
    projectId: "pblteachwebsite",
    storageBucket: "bucket",
    messagingSenderId: "sender",
    appId: "app-id",
  });
});

test("hasFirebaseCoreConfig only returns true when api key and project id remain after sanitation", () => {
  assert.equal(
    hasFirebaseCoreConfig({
      NEXT_PUBLIC_FIREBASE_API_KEY: " \n ",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "project-id",
    }),
    false
  );

  assert.equal(
    hasFirebaseCoreConfig({
      NEXT_PUBLIC_FIREBASE_API_KEY: "api-key",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: " project-id \n",
    }),
    true
  );
});
