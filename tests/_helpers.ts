import express from "express";
import { createRouter } from "../src/express";
import { default as fetch, Headers, Request, Response } from 'node-fetch';
import { promisify } from "util";

if (!globalThis.fetch) {
  globalThis.fetch = fetch as any;
  globalThis.Headers = Headers as any;
  globalThis.Request = Request as any;
  globalThis.Response = Response as any;
}

export let nextPort = 3300;

export function listen(router: ReturnType<typeof createRouter>) {
  let app = express();
  app.use(router.routes());
  let port = nextPort++;
  let server = app.listen(port);
  let baseUrl = `http://localhost:${port}`;
  let close = promisify(server.close.bind(server));
  return [baseUrl, close] as const;
}