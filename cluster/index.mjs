import { createServer } from "http";
import cluster from "cluster";
import { cpus } from "os";

const numOfCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Processo principal criado: ${process.pid}`);

  for (let i = 0; i < numOfCPUs; i++) {
    console.log(`Criando processo filho: ${i}...`);
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Processo ${worker.process.pid} finalizado`);
    cluster.fork();
  });
} else {
  const server = createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home page");
    }
  });

  server.listen(8000, () => {
    console.log("Servidor rodando na porta: 8000 no processo: ", process.pid);
  });
}
