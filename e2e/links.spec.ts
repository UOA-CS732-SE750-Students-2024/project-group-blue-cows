import { expect, test } from "@playwright/test";

// Don't know how to test with auth so these are commented out

// test("browse and join clubs button links to /clubs", async ({ page }) => {
//   await page.goto("http://localhost:3000/users/me/clubs");
//   await page.getByRole("button", { name: "Browse and Join Clubs" }).click();
//   await expect(page).toHaveURL(/\/clubs/);
// });

// test("register a club button links to /clubs/new", async ({ page }) => {
//   await page.goto("http://localhost:3000/users/me/clubs");
//   await page.getByRole("button", { name: "Register a Club" }).click();
//   await expect(page).toHaveURL(/\/clubs\/new/);
// });

test("browse clubs topnav button links to /clubs", async ({ page }) => {
  await page.goto("http://localhost:3000/clubs");
  await page.getByRole("link", { name: "Browse Clubs" }).click();
  await expect(page).toHaveURL(/\/clubs/);
});

// test("manage clubs topnav button links to /users/me/clubs", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:3000/clubs");
//   await page.getByRole("link", { name: "Manage Clubs" }).click();
//   await expect(page).toHaveURL(/\/users\/me\/clubs/);
// });

// test("profile topnav button links to /users/me", async ({ page }) => {
//   await page.goto("http://localhost:3000/clubs");
//   await page.getByRole("link", { name: "Profile" }).click();
//   await expect(page).toHaveURL(/\/users\/me/);
// });

test("search for clubs sidenav button links to /clubs", async ({ page }) => {
  await page.goto("http://localhost:3000/clubs");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/clubs/);
});
