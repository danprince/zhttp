import express from "express";
import { bench } from "./_bench";

export const app = express();

app.post("/limbs", express.json(), (req, res) => {
  let limbs = req.body.arms + req.body.legs;
  res.json({ limbs });
});

const server = app.listen(3500);
console.log("express");
bench().then(() => server.close());