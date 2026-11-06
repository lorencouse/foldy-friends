import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";

const adminEmail = "e2e-admin@example.com";
const adminPassword = "folding-admin-pass";

test("an admin can edit a product and see it in the shop", async ({ page, request, baseURL }) => {
  // Make sure the admin account exists; a repeat run just gets "already exists".
  await request.post("/api/auth/sign-up/email", {
    headers: { origin: baseURL ?? "" },
    data: { email: adminEmail, password: adminPassword, name: "Shop Admin" },
  });
  execFileSync("node", ["--env-file-if-exists=.env", "scripts/make-admin.ts", adminEmail], {
    stdio: "inherit",
  });

  await page.goto("/sign-in?next=/admin");
  await page.getByLabel("Email").fill(adminEmail);
  await page.getByLabel("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Products" })).toBeVisible();

  await page.getByRole("link", { name: /EZ glue pen/ }).click();
  const summary = `Twist, glide, done. ${Date.now()}`;
  await page.getByLabel("One-line summary").fill(summary);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toHaveText("Saved.");

  await page.goto("/shop/tools");
  await expect(page.getByText(summary)).toBeVisible();
});
