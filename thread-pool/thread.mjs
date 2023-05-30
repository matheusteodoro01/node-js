import { threadId, parentPort } from "node:worker_threads";
import { request } from "https";
import fs from "fs";

const start = Date.now();

parentPort.once("message", (data) => {
  console.log(`A thread: ${threadId} esta criando o arquivo:`, data);

  request("https://rickandmortyapi.com/api/character", (res) => {
    res.on("data", (chunk) => {
      const writeStreamFile = fs.createWriteStream(data.name + ".json");
      writeStreamFile.write(chunk);
    });
    res.on("end", () => {
      parentPort.postMessage(
        `A thread: ${threadId} terminou o processamento em ${Date.now() - start} ms`
      );
     
    });
  }).end();
});
