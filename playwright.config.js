// playwright.config.js


import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "https://qauto.forstudy.space",

    httpCredentials: {
  username: "guest",
  password: "welcome2qauto",
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
