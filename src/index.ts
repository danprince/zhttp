import type { z } from "zod";
import type { Path } from "static-path";

export type HttpMethodWithoutBody = "get" | "head";
export type HttpMethodWithBody = "post" | "put" | "patch" | "delete" | "options";
export type HttpMethod = HttpMethodWithBody | HttpMethodWithoutBody;

export type Endpoint<Pattern extends string, Method extends HttpMethod, Request, Response> =
  Method extends HttpMethodWithBody ? {
    path: Path<Pattern>;
    method: Method;
    request: z.ZodType<Request>;
    response: z.ZodType<Response>;
  } : {
    path: Path<Pattern>;
    method: Method;
    response: z.ZodType<Response>;
  };

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