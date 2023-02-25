import { setTimeout } from "timers/promises";
import { test } from "uvu";
import * as assert from "uvu/assert";
import * as backend from "./setup/backend.js";
import * as Puppeteer from "./setup/puppeteer.js";
import * as webpack from "./setup/webpack.js";

test.before(async (context) => {
  await webpack.build();
  await webpack.serve();
  await backend.start();
  await Puppeteer.setup(context);
});

test.after(async (context) => {
  await Puppeteer.reset(context);
  backend.stop();
  webpack.stopServing();
});

test("Solved Issue #1: Company Names are Present", async (context) => {
  await Puppeteer.homepage(context);
  await setTimeout(250);

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(1)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "Fusion LLC");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(1)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "Techopolis Ltd.");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(4) > td:nth-child(1)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "Code learning LLC");
});

test("Solved Issue #2: display dates in 24-hour time format", async (context) => {
  await Puppeteer.homepage(context);
  await setTimeout(250);

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "23:41");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(3)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "03:45");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(4) > td:nth-child(3)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "08:45");
});

test("Solved Issue #3: display revenue numbers in a human readable format", async (context) => {
  await Puppeteer.homepage(context);
  await setTimeout(250);

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(2) > td:nth-child(4)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "17 000 000");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(3) > td:nth-child(4)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "7 375 294");

  var text = await context.page.evaluate(() => {
    return document.querySelector("body > table > tbody > tr:nth-child(4) > td:nth-child(4)").textContent;
  });
  assert.type(text, "string");
  assert.is(text, "100 000");
});

test("Solved Issue #4: make table look prettier", async (context) => {
  await Puppeteer.homepage(context);
  await setTimeout(250);

  var headerColor = await context.page.evaluate(() => {
    let header = document.querySelector("body > table > tbody > tr:nth-child(1)");
    return window.getComputedStyle(header).getPropertyValue("background-color");
  });
  assert.is(headerColor, "rgb(173, 216, 230)");

  var tableBorderColor = await context.page.evaluate(() => {
    let table = document.querySelector("body > table");
    return window.getComputedStyle(table).getPropertyValue("border-color");
  });
  assert.is(tableBorderColor, "rgb(173, 216, 230)");
});

test.run();
