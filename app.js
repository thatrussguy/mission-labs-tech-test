const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const { routeNotFound } = require("./errors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);
app.all("/*", routeNotFound);

module.exports = app;
