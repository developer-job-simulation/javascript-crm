import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";
// Launch the browser
// Add `browser` and `page` to context
export async function setup(context) {
  // console.info("5 setting up puppeteer with context", context);
  try {
    context.browser = await puppeteer.launch({
      env: {
        TZ: "Etc/UTC",
      },
    });
    context.page = await context.browser.newPage();
    context.page.setDefaultNavigationTimeout(5000);
    await setTimeout(1000);
  } catch (e) {
    console.error("puppeteer setup failed", e);
  }
  // console.info("6 puppeteer is setup with context", context);
}

// Close everything on suite completion
export async function close(context) {
  // console.info("8 Closing puppeteer with context", context);
  await context.page.close();
  await context.browser.close();
  await setTimeout(1000);
}

const MAX_RETRIES = 3;
let numRetry = 0;

// const retry = (fn, ms) =>
//   new Promise((resolve) => {
//     fn()
//       .then(resolve)
//       .catch((error) => {
//         numRetry++;
//         if (numRetry < MAX_RETRIES) {
//           setTimeout(() => {
//             console.log("retrying...");
//             retry(fn, ms).then(resolve);
//           }, ms);
//         } else {
//           console.log("max retries reached");
//           reject(error);
//         }
//       });
//   });

// Navigate to homepage
export async function homepage(context) {
  // await retry(() => context.page.goto("http://localhost:8080"), 1000);
  await context.page.goto("http://localhost:8080");
}
