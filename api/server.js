const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const config = {
  server: 'localhost',
  database: 'lab3DB',
  user: 'admin',
  password: 'admin',
  options: {
    trustServerCertificate: true,
  },
};


app.get("/products", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT id, [name], [desc], img FROM products");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(port, () => {
  console.log(`Access port is - ${port}`);
});
