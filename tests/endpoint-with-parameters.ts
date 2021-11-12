import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../fetch";
import { createRouter } from "../express";
import { endpoint } from "../endpoint";
import { listen } from "./_helpers";

let sayHello = endpoint({
  path: path("/hello/:name"),
  method: "get",
  request: z.any(),
  response: z.object({
    message: z.string(),
  }),
});

let router = createRouter();

router.use(sayHello, (req, res) => {
  res.json({ message: `Hello, ${req.params.name}` });
});

test("endpoint with parameters", async () => {
  let [baseUrl, done] = listen(router);

  {
    let response = await fetchJson(sayHello, {
      baseUrl,
      params: { name: "Bollo" },
    });

    assert.equal(response, { message: `Hello, Bollo` });
  }

  {
    try {
      await fetchJson(sayHello, {
        baseUrl,
        // @ts-expect-error
        params: { typo: "Naboo" },
      });
    } catch (err: any) {
      // static-path will throw because params don't match
      assert.match(err.message, /didn't exist on params/);
    }
  }

  await done();
});

test.run();
