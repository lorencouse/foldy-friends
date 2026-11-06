import { expect, test } from "@playwright/test";

test("the guides index lists the guides and leads to a guide", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Shop" }).getByRole("link", { name: "Guides" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Fold it step by step" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How to start origami" })).toBeVisible();
  await page.getByRole("link", { name: "How to fold a paper crane" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "How to fold a paper crane" })).toBeVisible();
});

test("a guide shows every step with a diagram, structured data and shop links", async ({ page }) => {
  await page.goto("/guides/crane");
  const steps = page.getByRole("list", { name: "Steps" }).getByRole("listitem");
  await expect(steps).toHaveCount(14);
  await expect(steps.first().getByRole("img", { name: /diagonals/ })).toBeVisible();

  const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(jsonLd ?? "{}");
  const howTo = data["@graph"].find((n: { "@type": string }) => n["@type"] === "HowTo");
  expect(howTo.step).toHaveLength(14);

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /paper crane/);
  await page.getByRole("link", { name: "Double-sided origami paper, 100 sheets" }).first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Double-sided origami paper, 100 sheets" })).toBeVisible();
  await expect(page.getByRole("link", { name: "How to fold a paper crane" })).toBeVisible();
});

test("a kit's page links back to its guide", async ({ page }) => {
  await page.goto("/products/panda-asleep-on-the-moon");
  await page.getByRole("link", { name: "How to fold an origami panda face" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "How to fold an origami panda face" })).toBeVisible();
});

test("the sitemap lists the guides", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  const xml = await res.text();
  expect(xml).toContain("/guides/how-to-start-origami");
  expect(xml).toContain("/guides/panda");
});
