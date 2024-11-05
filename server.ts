import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: express.Express = express();
const port = process.env.SERVER_PORT;
app.use(cors());

import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL: ", error);
    return;
  }

  console.log("Success connecting to MySQL");
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
