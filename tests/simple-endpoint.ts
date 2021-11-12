import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { ValidationError, fetchJson } from "../fetch";
import { createRouter } from "../express";
import { endpoint } from "../endpoint";
import { listen } from "./_helpers";

let add = endpoint({
  path: path("/add"),
  method: "post",
  request: z.object({
    lhs: z.number(),
    rhs: z.number(),
  }),
  response: z.object({
    result: z.number(),
  }),
});

let router = createRouter();

router.use(add, (req, res) => {
  let result = req.body.lhs + req.body.rhs;
  res.json({ result });
});

test("simple endpoint", async () => {
  let [baseUrl, done] = listen(router);

  {
    let response = await fetchJson(add, {
      baseUrl,
      body: { lhs: 1, rhs: 2 },
    });

    assert.equal(response, { result : 3 });
  }

  {
    try {
      let response = await fetchJson(add, {
        baseUrl,
        // @ts-expect-error
        body: { lhs: "1", rhs: 2 },
      });
    } catch (err: any) {
      assert.instance(err, ValidationError);
      assert.equal(err.issues, [
        {
          "code": "invalid_type",
          "expected": "number",
          "received": "string",
          "path": ["lhs"],
          "message": "Expected number, received string"
        }
      ]);
    }
  }

  {
    let response = await fetchJson(add, {
      baseUrl,
      body: { lhs: 1, rhs: 2 },
    });

    // @ts-expect-error
    let result = response.result as string;
  }

  await done();
});

test.run();
