import { betterAuth } from "better-auth";
import { createClient } from "@libsql/client";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const isVercel = process.env.VERCEL === "1";
const dbUrl = process.env.TURSO_DATABASE_URL
  ? process.env.TURSO_DATABASE_URL
  : isVercel
  ? "file:/tmp/auth.db"
  : "file:auth.db";

const client = createClient({
  url: dbUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initTables() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        emailVerified INTEGER NOT NULL DEFAULT 0,
        image TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      );
    `);
    await client.execute(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        expiresAt INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        ipAddress TEXT,
        userAgent TEXT,
        userId TEXT NOT NULL REFERENCES user(id)
      );
    `);
    await client.execute(`
      CREATE TABLE IF NOT EXISTS account (
        id TEXT PRIMARY KEY,
        accountId TEXT NOT NULL,
        providerId TEXT NOT NULL,
        userId TEXT NOT NULL REFERENCES user(id),
        accessToken TEXT,
        refreshToken TEXT,
        idToken TEXT,
        accessTokenExpiresAt INTEGER,
        refreshTokenExpiresAt INTEGER,
        scope TEXT,
        password TEXT,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      );
    `);
    await client.execute(`
      CREATE TABLE IF NOT EXISTS verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expiresAt INTEGER NOT NULL,
        createdAt INTEGER,
        updatedAt INTEGER
      );
    `);
  } catch {
    // Ignore error if already created
  }
}

initTables();

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const auth = betterAuth({
  database: {
    dialect: new LibsqlDialect({ client: client as any }),
    type: "sqlite",
  },
  baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://*.vercel.app",
    "https://b14-a7-bazar-dor-rust.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo-github-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo-github-secret",
    },
  },
});
