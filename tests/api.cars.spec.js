// tests/api.cars.spec.js
import { test, expect } from "@playwright/test";

const BASE_URL = "https://qauto.forstudy.space";

let api;

test.beforeAll(async ({ playwright }) => {
  api = await playwright.request.newContext({
    baseURL: BASE_URL,
  });

  const loginResponse = await api.post("/api/auth/signin", {
    data: {
      email: "tar@yahoo.com",
      password: "6B9HXWjwSRVpy6w",
      remember: true,
    },
  });

  const loginBody = await loginResponse.json();

  expect(loginResponse.ok()).toBeTruthy();
  expect(loginBody.status).toBe("ok");
});

test.afterAll(async () => {
  await api.dispose();
});

test("API /cars POST – positive: valid car is created", async () => {
  const res = await api.post("/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 1000,
    },
  });

  const body = await res.json();

  expect(res.status()).toBe(201);
  expect(body.status).toBe("ok");
  expect(body.data).toHaveProperty("id");
});

test("API /cars POST – negative: missing mileage", async () => {
  const res = await api.post("/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
    },
  });

  const body = await res.json();

  expect(res.status()).toBe(400);
  expect(body.status).toBe("error");
});

test("API /cars POST – negative: invalid mileage value", async () => {
  const res = await api.post("/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: -10,
    },
  });

  const body = await res.json();

  expect(res.status()).toBe(400);
  expect(body.status).toBe("error");
});
