import { expect, test } from "@playwright/test";

test("signing in redirects you properly", async ({ page }) => {
  await page.goto("http://localhost:3000/clubs");
  await page.getByRole("button", { name: "Google Logo Sign in with" }).click();
  await expect(page.locator("body")).toContainText(
    "To continue, Google will share your name, email address, language preference, and profile picture with SOFTENG 750 Blue Cows."
  );
});

