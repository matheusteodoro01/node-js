import mysql from "mysql2";
import fs from "fs";

const fetchDataFromDatabase = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RootPassword",
    database: "drogalima",
  });

  return await connection.promise().query("SELECT * FROM produto LIMIT 500");
};

process.on("message", async (message) => {
  if (message !== "execute") return;
  const fileName = new Date().getTime();

  const data = await fetchDataFromDatabase();

  const writeStreamFile = fs.createWriteStream(fileName + ".json");

  writeStreamFile.write(JSON.stringify(data));

  process.send({ message: "Arquivo gerado: " + fileName });
});
