import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson, ValidationError } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

endpoint({
  // @ts-ignore (Don't understand why this errors)
  path: path("/hello"),
  method: "get",
  response: z.object({
    results: z.any(),
  }),
  // @ts-expect-error (query string with non-string types)
  query: z.object({
    hello: z.boolean(),
  }),
});

const search = endpoint({
  path: path("/search"),
  method: "get",
  response: z.object({
    results: z.string(),
  }),
  query: z.object({
    for: z.string(),
  }),
});

let router = createRouter();

router.use(search, (req, res) => {
  res.json({ results: `Searched for ${req.query.for}` });
});

test("endpoint with query", async () => {
  let [baseUrl, done] = listen(router);

  {
    let response = await fetchJson(search, {
      baseUrl,
      query: { for: "Naboo" },
    });

    assert.equal(response, { results: `Searched for Naboo` });
  }

  {
    try {
      // @ts-expect-error (query is missing)
      await fetchJson(search, { baseUrl });
    } catch (err: any) {
      assert.instance(err, ValidationError);
      assert.equal(err.issues, [
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["for"],
          message: "Required",
        }
      ]);
    }
  }

  {
    try {
      // @ts-expect-error (query is invalid)
      await fetchJson(search, { baseUrl, query: { foo: 3 } });
    } catch (err: any) {
      assert.instance(err, ValidationError);
      assert.equal(err.issues, [
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["for"],
          message: "Required",
        }
      ]);
    }
  }

  await done();
});

test.run();
