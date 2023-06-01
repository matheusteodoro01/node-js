//UV_THREADPOOL_SIZE=5 node index.mjs
import { Worker } from "node:worker_threads";

const createThread = (data) => {
  const worker = new Worker("./thread.mjs");
  worker.postMessage(data);

  const threadPromise = new Promise((resolve, reject) => {
    worker.once("message", (message) => {
      return resolve(message);
    });
    worker.once("error", reject);
  });

  return threadPromise;
};

const results = await Promise.all([
  createThread({}),
  createThread({}),
  createThread({}),
  createThread({}),
  createThread({}),
  createThread({}),
]);

console.log(results);

