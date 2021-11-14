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
 * Helper for defining endpoints.
 * 
 * ```ts
 * import { endpoint } from "@danprince/zhttp";
 * import { path } from "static-path";
 * 
 * // define GET /examples/:name
 * export let getExampleByName = endpoint({
 *   method: "get",
 *   path: path("/examples/:name"),
 *   response: z.object({ name: z.string() }),
 * });
 * 
 * // define POST /books/:id
 * export let updateBook = endpoint({
 *   method: "post",
 *   path: path("/books/:id"),
 *   request: z.object({ title: z.string() }),
 *   response: z.object({ id: z.string(), title: z.string() }),
 * });
 * ```
 * 
 * It's possible to declare endpoints without this function, but it requires
 * more duplication of type annotations.
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
