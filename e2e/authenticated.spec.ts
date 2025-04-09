import { test } from "@playwright/test";

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/profile");

    await page.waitForSelector(
      `div:has-text('${process.env.E2E_CLERK_USER_EMAIL}')`,
    );
  });
});
