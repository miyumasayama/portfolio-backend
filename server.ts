import express from "express";
import cors from "cors";

const app: express.Express = express();
const port = 8000;
app.use(cors());

import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "portfolio",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL: ", error);
    return;
  }

  console.log("Success connecting to MySQL");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/costumes", async (req, res) => {
  const query = "SELECT * FROM costumes"; // Adjust this to your actual table and fields

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching costumes: ", error);
      return res.status(500).json({ error: "Could not retrieve costumes" });
    }

    // Respond with the retrieved costume data
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
