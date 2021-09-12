// import express from "express";
import { router } from "./routes";
import cors from "cors";
import { errorHandler } from "./errors/handler";

require('express-async-errors');
const express = require('express');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.use((error, req, res, next) => {
  console.log("error middleware");
  res.sendStatus(500);
});

app.listen(3333);
