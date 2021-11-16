import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

const search = endpoint({
  path: path("/search"),
  method: "get",
  response: z.object({
    query: z.any(),
  }),
  query: z.object({
    for: z.string(),
  }),
});

let router = createRouter();

router.use(search, (req, res) => {
  res.json({ query: req.query });
});

test("endpoint strips extra query params", async () => {
  let [baseUrl, done] = listen(router);

  {
    let response = await fetchJson(search, {
      baseUrl,
      // @ts-expect-error
      query: { for: "Naboo", bad: "actor" },
    });

    assert.equal(response, { query: { for: "Naboo" } });
  }

  await done();
});

test.run();
