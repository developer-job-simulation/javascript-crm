import { chromium } from "playwright";
import { setTimeout } from "timers/promises";
import { test } from "uvu";
import * as assert from "uvu/assert";

let browser;
let context;
let page;

test.before(async () => {
  browser = await chromium.launch({
    use: { timezoneId: "Etc/UTC" },
  });
  context = await browser.newContext();
});

test.before.each(async () => {
  page = await context.newPage();
});

test.after.each(async () => {
  await page.close();
});

test.after(async () => {
  await browser.close();
  await context.close();
});

test("Solved Issue #1: Company Names are Present", async () => {
  await page.goto("http://localhost:8080");
  await setTimeout(250);

  var text = await page.$eval("body > table > tbody > tr:nth-child(2) > td:nth-child(1)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "Fusion LLC");

  var text = await page.$eval("body > table > tbody > tr:nth-child(3) > td:nth-child(1)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "Techopolis Ltd.");

  var text = await page.$eval("body > table > tbody > tr:nth-child(4) > td:nth-child(1)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "Code learning LLC");
});

test("Solved Issue #2: display dates in 24-hour time format", async () => {
  await page.goto("http://localhost:8080");
  await setTimeout(250);

  var text = await page.$eval("body > table > tbody > tr:nth-child(2) > td:nth-child(3)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "03:41");

  var text = await page.$eval("body > table > tbody > tr:nth-child(3) > td:nth-child(3)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "08:45");

  var text = await page.$eval("body > table > tbody > tr:nth-child(4) > td:nth-child(3)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "12:45");
});

test("Solved Issue #3: display revenue numbers in a human readable format", async () => {
  await page.goto("http://localhost:8080");
  await setTimeout(250);

  var text = await page.$eval("body > table > tbody > tr:nth-child(2) > td:nth-child(4)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "17 000 000");

  var text = await page.$eval("body > table > tbody > tr:nth-child(3) > td:nth-child(4)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "7 375 294");

  var text = await page.$eval("body > table > tbody > tr:nth-child(4) > td:nth-child(4)", (el) => el.textContent);
  assert.type(text, "string");
  assert.is(text, "100 000");
});

test("Solved Issue #4: make table look prettier", async () => {
  await page.goto("http://localhost:8080");
  await setTimeout(250);

  var headerColor = await page.$eval("tr:first-of-type", (el) =>
    getComputedStyle(el).getPropertyValue("background-color")
  );
  assert.is(headerColor, "rgb(173, 216, 230)");

  var tableBorderColor = await page.$eval("body > table", (el) =>
    getComputedStyle(el).getPropertyValue("border-color")
  );
  assert.is(tableBorderColor, "rgb(173, 216, 230)");
});

test.run();
