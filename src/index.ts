import type { z } from "zod";
import type { Path } from "static-path";

export type HttpMethodWithoutBody = "get" | "head";
export type HttpMethodWithBody = "post" | "put" | "patch" | "delete" | "options";
export type HttpMethod = HttpMethodWithBody | HttpMethodWithoutBody;

/**
 * Definition for a typed HTTP endpoint.
 * 
 * {@see endpoint}
 */
export type Endpoint<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
  Response
> = Method extends HttpMethodWithBody ? {
  path: Path<Pattern>;
  method: Method;
  response: z.ZodType<Response>;
  request: z.ZodType<Request>;
} : {
  path: Path<Pattern>;
  method: Method;
  response: z.ZodType<Response>;
};

/**
 * Helper for defining endpoints so that they end up with the correct types
 * without needing to annotate them explicitly.
 * 
 * @example
 * ```ts
 * let myEndpoint = endpoint({
 *   path: "/example",
 *   method: "get",
 *   response: z.object({ id: z.number() }),
 * });
 * 
 * // vs
 * 
 * let myEndpoint: Endpoint<"/example", "get", never, { id: number }> = {
 *   path: "/example",
 *   method: "get",
 *   response: z.object({ id: z.number() }),
 * };
 * ```
 */
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
