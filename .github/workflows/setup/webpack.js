import { spawn } from "node:child_process";
import { setTimeout } from "timers/promises";
var webpackServeSocket = {};

export async function build() {
  let socket = spawn("npx webpack", {
    shell: true,
  });
  // console.info("2 Webpack is building...");
  await setTimeout(1000);
  socket.kill();
}

export async function serve() {
  let socket = spawn("npx webpack serve", {
    shell: true,
  });
  webpackServeSocket = socket;
  // console.info("3 Webpack is starting...");
  await setTimeout(1000);
}

export function stopServing() {
  // console.info("10 Webpack is stopping...");
  webpackServeSocket.kill();
}
