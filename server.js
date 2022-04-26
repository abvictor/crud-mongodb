require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-cluster.sulbj.mongodb.net/API_database?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB conectado com sucesso");
    app.listen(3333, console.log("Servidor rodando na porta 3333"));
  })
  .catch((err) => console.log(err));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Express started successfully" });
});
