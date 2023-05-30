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
  createThread({
    name: "file01",
  }),
  createThread({
    name: "file02",
  }),
  createThread({
    name: "file03",
  }),
  createThread({
    name: "file04",
  }),
  createThread({
    name: "file05",
  }),

]);

console.log(results);
