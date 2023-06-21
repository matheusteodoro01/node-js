import { createServer } from "http";
import { fork } from "child_process";

function requestHandler(req, res) {
  if (req.url === "/data") {
    const child = fork("index.mjs");
   
    console.log("Processo filho criado com ID: ", child.pid);

    child.on("message", (message) => {
      child.kill();
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(message));
    });

    child.send("execute");

    child.on("exit", () => {
      console.log("Processo filho encerrado com ID: ", child.pid);
    });
  } else {
    res.end("Endpoint inválido");
  }
}


const server = createServer(requestHandler);

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
