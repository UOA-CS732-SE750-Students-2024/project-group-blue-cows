import { test, expect } from "@playwright/test";

// A sample playwright test for our app
test("non-authenticated user should be redirected to the clubs page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveURL(/\/clubs/);
  await expect(
    page.getByRole("main").getByRole("heading", { name: "Browse Clubs" })
  ).toBeVisible();
});

test("non-authenticated user should have sign-in button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(
    page.getByRole("button", { name: "Google Logo Sign in with" })
  ).toBeVisible();
});
