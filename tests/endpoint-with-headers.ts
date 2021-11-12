import { test } from "uvu";
import * as assert from "uvu/assert";
import { path } from "static-path";
import { z } from "zod";
import { fetchJson } from "../src/fetch";
import { createRouter } from "../src/express";
import { endpoint } from "../src";
import { listen } from "./_helpers";

let echoHeaders = endpoint({
  path: path("/headers"),
  method: "post",
  request: z.any(),
  response: z.any(),
});

let router = createRouter();

router.use(echoHeaders, (req, res) => {
  res.json(req.headers);
});

test("endpoint with headers", async () => {
  let [baseUrl, done] = listen(router);

  let response = await fetchJson(echoHeaders, {
    baseUrl,
    headers: { "vince": "noire" },
    body: {},
  });

  assert.equal(response["vince"], "noire");

  await done();
});

test.run();
