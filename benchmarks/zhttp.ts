import express from "express";
import { z } from "zod";
import { path } from "static-path";
import { bench } from "./_bench";
import { endpoint } from "../src/index";
import { createRouter } from "../src/express";

const app = express();

const limbs = endpoint({
  method: "post",
  path: path("/limbs"),
  request: z.object({ arms: z.number(), legs: z.number() }),
  response: z.object({ limbs: z.number() }),
});

const router = createRouter();

router.use(limbs, (req, res) => {
  let limbs = req.body.arms + req.body.legs;
  res.json({ limbs });
});

app.use(router.routes());

const server = app.listen(3500);
console.log("zhttp");
bench().then(() => server.close());