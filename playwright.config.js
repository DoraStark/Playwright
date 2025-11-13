// playwright.config.js
import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: process.env.BASE_URL || "https://qauto.forstudy.space",

    httpCredentials: {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    },
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.js/,
    },

    {
      name: "ui",
      testMatch: /.*\.spec\.js/,
      dependencies: ["setup"],
    },
  ],
});
