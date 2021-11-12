import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { createClient, ValidationError } from "../fetch";
import { createRouter } from "../express";
import { endpoint } from "../endpoint";
import { listen } from "./_helpers";

let triple = endpoint({
  path: path("/triple"),
  method: "post",
  request: z.object({ input: z.number() }),
  response: z.object({ output: z.number() }),
});

let router = createRouter();

router.use(triple, (req, res) => {
  res.json({ output: req.body.input * 3 });
});

test("ignores exports that are not endpoints", async () => {
  let client = createClient({
    triple,
    name: "maths",
  });

  assert.equal(Object.keys(client), ["triple"]);

  // @ts-expect-error
  client.name;
});

test("simple client", async () => {
  let [baseUrl, done] = listen(router);

  // Pretend this is a module
  let exports = { triple };

  let client = createClient(exports, {
    baseUrl,
  });

  {
    let response = await client.triple({
      body: { input: 1 },
      params: {},
    });

    assert.equal(response, { output: 3 });
  }

  {
    try {
      await client.triple({
        // @ts-expect-error
        body: { input: "10" },
        params: {},
      });
    } catch (err: any) {
      assert.instance(err, ValidationError);
      assert.equal(err.issues, [
        {
          "code": "invalid_type",
          "expected": "number",
          "received": "string",
          "path": ["input"],
          "message": "Expected number, received string"
        }
      ]);
    }
  }

  await done();
});

test.run();
