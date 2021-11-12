import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

endpoint({
  // @ts-ignore (Not sure why this errors)
  path: path("/time"),
  method: "get",
  // @ts-expect-error (It's an error to have a request schema with GET)
  request: z.object(),
  response: z.object({ time: z.number() }),
});

let time = endpoint({
  path: path("/time"),
  method: "get",
  response: z.object({ time: z.number() }),
});

let router = createRouter();

router.use(time, (req, res) => {
  res.json({ time: Date.now() });
});

test("endpoint without body", async () => {
  let [baseUrl, done] = listen(router);

  {
    try {
      await fetchJson(time, {
        baseUrl,
        // @ts-expect-error (It's an error to pass a body to GET request)
        body: { lhs: 1, rhs: 2 },
      });
    } catch (err: any) {
      assert.match(err.message, /cannot have body/);
    }
  }

  {
    let response = await fetchJson(time, { baseUrl });
    assert.is(typeof response.time, "number");
  }

  await done();
});

test.run();