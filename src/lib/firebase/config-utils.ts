type FirebaseEnv = Partial<
  Record<
    | "NEXT_PUBLIC_FIREBASE_API_KEY"
    | "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    | "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    | "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    | "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    | "NEXT_PUBLIC_FIREBASE_APP_ID",
    string | undefined
  >
>;

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

function sanitizeEnvValue(value: string | undefined) {
  return value?.replace(/[\r\n\t]+/g, "").trim() ?? "";
}

function sanitizeAuthDomain(value: string | undefined) {
  const sanitized = sanitizeEnvValue(value);
  if (!sanitized) return "";

  return sanitized
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

export function getFirebaseConfig(env: FirebaseEnv): FirebaseClientConfig {
  return {
    apiKey: sanitizeEnvValue(env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: sanitizeAuthDomain(env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: sanitizeEnvValue(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: sanitizeEnvValue(env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: sanitizeEnvValue(
      env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    ),
    appId: sanitizeEnvValue(env.NEXT_PUBLIC_FIREBASE_APP_ID),
  };
}

export function hasFirebaseCoreConfig(env: FirebaseEnv) {
  const config = getFirebaseConfig(env);
  return Boolean(config.apiKey && config.projectId);
}
