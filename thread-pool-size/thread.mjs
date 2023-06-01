import { threadId, parentPort } from "node:worker_threads";
import crypto from "node:crypto";

const start = Date.now();

parentPort.once("message", ({ data }) => {
  console.log(`A thread: ${threadId} esta iniciando`);

  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>
    parentPort.postMessage(
      `A thread: ${threadId} terminou o processamento em ${
        Date.now() - start
      } ms`
    )
  );
});
