import { spawn } from "node:child_process";
import { setTimeout } from "timers/promises";
var webpackServeSocket = {};

export async function build() {
  let socket = spawn("webpack", {
    shell: true,
  });
  console.info("Webpack is building...");
  await setTimeout(2000);
  socket.kill();
}

export async function serve() {
  let socket = spawn("npx webpack serve", {
    shell: true,
  });
  webpackServeSocket = socket;
  console.info("Webpack is starting...");
  await setTimeout(1000);
}

export function stopServing() {
  webpackServeSocket.kill();
}
