import { expect, test } from "@playwright/test";

test("home page says what the shop is and folds the dog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "foldy friends" })).toBeVisible();
  const fold = page.getByRole("button", { name: /unfold and start again/i }).first();
  await fold.scrollIntoViewIfNeeded();
  await fold.click();
  await expect(page.getByText("Start with a square, turned to a diamond.").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "The price list" })).toBeVisible();
});

test("browse, add to cart and place a demo order", async ({ page }) => {
  await page.goto("/shop/kits");
  await expect(page.getByRole("heading", { level: 1, name: "Kits" })).toBeVisible();
  await page.getByRole("link", { name: /Elephant asleep on the moon/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Elephant asleep on the moon" })).toBeVisible();

  await page.getByText("Yellow", { exact: true }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("button", { name: "Added to your cart" })).toBeVisible();

  await page.goto("/cart");
  await expect(page.getByText("Yellow", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /One more Elephant/ }).click();
  await expect(page.getByText("$59.94").first()).toBeVisible();
  await page.getByRole("link", { name: "Check out" }).click();

  await page.getByLabel("Email").fill("buyer@example.com");
  await page.getByLabel("Full name").fill("Sam Folder");
  await page.getByLabel("Street address").fill("1 Crane Street");
  await page.getByLabel("Town or city").fill("Portland");
  await page.getByLabel("State").fill("OR");
  await page.getByLabel("ZIP code").fill("97201");
  await page.getByRole("button", { name: "Place demo order" }).click();

  await expect(page.getByRole("heading", { level: 1, name: /Order FF-[0-9A-F]{8} placed/ })).toBeVisible();
  await expect(page.getByText("$59.94").first()).toBeVisible();
  await page.goto("/cart");
  await expect(page.getByText("Nothing folded in here yet.")).toBeVisible();
});

test("a shopper can sign up and review a product", async ({ page }) => {
  const email = `folder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@example.com`;
  await page.goto("/products/patterned-origami-paper");
  await page.getByRole("link", { name: "Sign in to write a review" }).click();
  await page.getByRole("button", { name: "Create an account" }).click();
  await page.getByLabel("Your name").fill("Robin Crane");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("paper-cranes-1000");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/products\/patterned-origami-paper/);
  await page.getByLabel("Title").fill("Lovely patterns");
  await page.getByLabel("Your review").fill("The wave pattern makes the best cranes we have folded.");
  await page.getByRole("button", { name: "Post review" }).click();
  await expect(page.getByText("Thank you. Your review is up.")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Lovely patterns" }).first()).toBeVisible();
});

test("admin pages are hidden from shoppers", async ({ page }) => {
  const res = await page.goto("/admin");
  // Signed out: sent to sign in.
  await expect(page).toHaveURL(/\/sign-in\?next=%2Fadmin/);
  expect(res?.ok()).toBeTruthy();
});

test("unknown pages get a friendly 404", async ({ page }) => {
  await page.goto("/products/not-a-real-thing");
  // The page shell streams first, so a missing product is marked noindex rather than sent as a 404 status.
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
  await expect(page.getByRole("heading", { name: "This page came unfolded" })).toBeVisible();
});
