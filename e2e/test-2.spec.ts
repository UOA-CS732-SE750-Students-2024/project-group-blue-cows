// @ts-check
import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/clubs");
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill("WDCC");
  await expect(page.getByText("AcademicWDCC")).toBeVisible();
});
