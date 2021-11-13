import { Params } from "static-path";
import { ZodIssue } from "zod";
import { Endpoint, HttpMethod, HttpMethodWithoutBody } from ".";

/**
 * Default options for all fetch methods.
 */
export interface FetchDefaults {
  baseUrl: string;
  headers: HeadersInit;
  options: RequestInit;
}

/**
 * Complete set of options for a given request, based on the parameters and the
 * method.
 * 
 * - GET/HEAD methods won't allow a `body` property.
 * - Paths without any parameters won't allow a `params` property.
 */
export type FetchOptions<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
> = (
  Partial<FetchDefaults> &
  // Only include the params key if the pattern actually has params
  (keyof Params<Pattern> extends never ? {} : { params: Params<Pattern> }) &
  // Only include the body key if the http method can accept a body
  (Method extends HttpMethodWithoutBody ? {} : { body: Request })
);

/**
 * These are the default options that will be merged into all fetch requests.
 * They can be overriden.
 */
const defaultOptions: FetchDefaults = {
  baseUrl: "/",
  headers: {
    "Content-type": "application/json"
  },
  options: {},
};

/**
 * Error class that will be thrown if server-side validation fails a given
 * fetch request.
 */
export class ValidationError extends Error {
  constructor(public issues: ZodIssue[]) {
    super();
    this.name = "ValidationError";
  }
}

/**
 * Fetches JSON from an endpoint.
 * @param endpoint A zhttp endpoint
 * @param options Request options
 * @returns Parsed server response body
 * 
 * @example Fetching from an endpoint
 * ```ts
 * let response = await fetchJson(someEndpoint, {
 *   baseUrl: "/", // default baseUrl
 *   headers: { "Content-type": "application/json" } // default headers
 *   options: {}, // default fetch options
 * });
 * ```
 * 
 * @example Passing custom headers
 * ```ts
 * let response = fetchJson(someEndpoint, {
 *   headers: {
 *     "Content-type": "application/json",
 *     "Authentication": "Basic XXYYZZ"
 *   }
 * });
 * ```
 * Note: Any passed headers will override the default headers, so ensure that
 * a `"Content-type": "application/json"` header is present.
 * 
 * @example Custom fetch options
 * ```ts
 * let response = await fetchJson(someEndpoint, {
 *   options: {
 *     mode: "cors",
 *     credentials: "include"
 *   },
 * });
 * ```
 * These options are passed directly to the request options for `fetch`.
 */
export async function fetchJson<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
  Response
>(
  endpoint: Endpoint<Pattern, Method, Request, Response>,
  options: FetchOptions<Pattern, Method, Request>
): Promise<Response> {
  let {
    baseUrl,
    headers,
    body = undefined,
    params = {},
    options: extraFetchOptions,
  } = { ...defaultOptions, ...options };

  // Construct full url from base url and parameterized path
  let path = endpoint.path(params as Params<Pattern>);
  let url = new URL(path, baseUrl).toString();

  let init: RequestInit = {
    method: endpoint.method,
    headers: new Headers(headers),
    body: JSON.stringify(body),
    // Allow extra fetch options to override
    ...extraFetchOptions,
  };

  let response = await fetch(url, init);
  let data = await response.json();

  if (response.status === 400 && Array.isArray(data?.errors)) {
    throw new ValidationError(data.errors);
  }

  return data;
}

/**
 * Describes a client object
 */
type Client<Exports> = {
  [K in keyof Exports as Exports[K] extends Endpoint<any, any, any, any> ? K : never]:
    Exports[K] extends Endpoint<infer Pattern, infer Method, infer Request, infer Response>
      ? ClientFetch<Pattern, Method, Request, Response>
      : never;
};

/**
 * 
 */
type ClientFetch<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
  Response
> = (
  options: FetchOptions<Pattern, Method, Request>
) => Promise<Response>;

/**
 * 
 * @param exports 
 * @param defaults 
 * @returns 
 */
export function createClient<Exports extends Record<string, any>>(
  exports: Exports,
  defaults?: Partial<FetchDefaults>,
): Client<Exports> {
  let client: any = {};

  for (let name of Object.keys(exports)) {
    let endpoint = exports[name];

    if (
      endpoint &&
      typeof endpoint.path === "function" &&
      typeof endpoint.method === "string"
    ) {
      client[name] = (options: any) => {
        return fetchJson(endpoint, { ...defaults, ...options });
      };
    }
  }

  return client;
}
