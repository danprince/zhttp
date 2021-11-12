import type { z } from "zod";
import type { Path } from "static-path";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete" | "head" | "options";

export interface Endpoint<Pattern extends string, Method extends HttpMethod, Request, Response> {
  path: Path<Pattern>;
  method: Method;
  request: z.ZodType<Request>;
  response: z.ZodType<Response>;
}

export function endpoint<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
  Response,
>(
  endpoint: Endpoint<Pattern, Method, Request, Response>
) {
  return endpoint;
}
