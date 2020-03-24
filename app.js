const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authoriser = require("./middleware/authoriser");
const productsRouter = require("./routes/products");
const { handle500, handleSqliteErrors, routeNotFound } = require("./errors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(authoriser);

app.use("/products", productsRouter);
app.all("/*", routeNotFound);

app.use(handleSqliteErrors);
app.use(handle500);

module.exports = app;
