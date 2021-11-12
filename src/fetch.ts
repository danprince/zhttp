import { Params } from "static-path";
import { Endpoint, HttpMethod, HttpMethodWithoutBody } from ".";

interface FetchDefaults {
  baseUrl: string;
  headers: HeadersInit;
  options: RequestInit;
}

type FetchOptions<
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

const defaultOptions: FetchDefaults = {
  baseUrl: "/",
  headers: {
    "Content-type": "application/json"
  },
  options: {},
};

export class ValidationError extends Error {
  constructor(public issues: any) {
    super();
    this.name = "ValidationError";
  }
}

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

type Client<Exports> = {
  [K in keyof Exports as Exports[K] extends Endpoint<any, any, any, any> ? K : never]:
    Exports[K] extends Endpoint<infer Pattern, infer Method, infer Request, infer Response>
      ? ClientFetch<Pattern, Method, Request, Response>
      : never;
};

type ClientFetch<
  Pattern extends string,
  Method extends HttpMethod,
  Request,
  Response
> = (
  options: FetchOptions<Pattern, Method, Request>
) => Promise<Response>;

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
