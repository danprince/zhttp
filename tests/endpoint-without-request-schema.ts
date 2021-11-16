import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

let logout = endpoint({
  path: path("/logout"),
  method: "post",
  response: z.object({ ok: z.boolean() }),
});

let router = createRouter();

router.use(logout, (req, res) => {
  res.json({ ok: true });
});

test("endpoint without request schema", async () => {
  let [baseUrl, done] = listen(router);

  {
    // Call without a body parameter shouldn't be a type error
    let response = await fetchJson(logout, { baseUrl });
    assert.equal(response, { ok: true });
  }

  {
    await fetchJson(logout, {
      baseUrl,
      // @ts-expect-error (It's an error to pass a body to this endpoint)
      body: { lhs: 1, rhs: 2 },
    });
  }

  await done();
});

test.run();