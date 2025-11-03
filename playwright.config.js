import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    },
  },

  testDir: "./tests",
});
