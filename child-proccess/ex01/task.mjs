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

export const task = async () => {
  const data = await fetchDataFromDatabase();
  const fileName = new Date().getTime();
  const writeStreamFile = fs.createWriteStream(new Date().getTime() + ".json");
  writeStreamFile.write(JSON.stringify(data));
  return { message: "Arquivo gerado: " + fileName };
};
