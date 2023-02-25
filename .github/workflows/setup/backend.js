import { spawn } from "node:child_process";
import { setTimeout } from "timers/promises";
var backendSocket = {};

export async function start() {
  let socket = spawn("npx json-server --watch db.json", {
    shell: true,
  });
  backendSocket = socket;
  console.info("Backend is starting...");
  await setTimeout(1000);
}

export function stop() {
  backendSocket.kill();
}
