import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

let doubleIfPositive = endpoint({
  path: path("/double"),
  method: "post",
  request: z.object({ input: z.number() }),
  response: z.object({ output: z.number() }),
});

let router = createRouter();

router.use(
  doubleIfPositive,
  // First handler checks for positive numbers
  (req, res, next) => {
    if (req.body.input < 0) {
      res.status(400).json({ output: 0 });
    } else {
      next();
    }
  },
  // Second handler does the actual doubling
  (req, res) => {
    res.send({ output: req.body.input * 2 });
  }
);

test("endpoint with middleware", async () => {
  let [baseUrl, done] = listen(router);

  {
    let response = await fetchJson(doubleIfPositive, {
      baseUrl,
      body: { input: 1 },
    });

    assert.equal(response, { output: 2 });
  }

  {
    let response = await fetchJson(doubleIfPositive, {
      baseUrl,
      body: { input: -4 },
    });

    assert.equal(response, { output: 0 });
  }

  await done();
});

test.run();
