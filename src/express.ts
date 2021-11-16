/**
 * Helpers for using zhttp endpoints with Express.
 * @module
 */

import Express from "express";
import { Params } from "static-path";
import { Endpoint, HttpMethod } from ".";
import PromiseRouter from "express-promise-router";

/**
 * Helper type that will infer the correct type for an endpoint request handler.
 * 
 * @example
 * ```ts
 * let withAuth: RequestHandler<typeof logout> = (req, res) => {
 *   // req, res are typed for the logout endpoint
 * };
 * ```
 */
export type RequestHandler<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<infer Pattern, any, infer Request, infer Response>
    ? Express.RequestHandler<Params<Pattern>, Response, Request> : never;

/**
 * A wrapper for Express.Router that can associate request handlers with
 * endpoints in a type safe way.
 */
export interface Router {
  /**
   * Returns the underlying Express.Router.
   */
  routes(): Express.Router;

  /**
   * Add request handlers to an {@link Endpoint}.
   * 
   * @param endpoint Endpoint to handle
   * @param handlers Express middleware/request handlers
   */
  use<
    Pattern extends string,
    Method extends HttpMethod,
    Request,
    Response,
    Query extends qs.ParsedQs,
    Locals extends Record<string, any>
  >(
    endpoint: Endpoint<Pattern, Method, Request, Response>,
    ...handlers: Express.RequestHandler<
      Params<Pattern>,
      Response,
      Request,
      Query,
      Locals
    >[]
  ): void;
}

/**
 * 
 * @param expressRouter Optional instance of an Express.Router to use
 * @returns A typed router
 * 
 * @example Creating a router
 * 
 * ```ts
 * let router = createRouter(); 
 * router.use(endpoint, (req, res) => {});
 * ```
 * 
 * @example Using an existing router
 * 
 * ```ts
 * // router is an existing Express.Router
 * let { use } = createRouter(router);
 * 
 * router.post(...);
 * use(endpoint, (req, res) => {});
 * router.post(...);
 * ```
 * 
 * @example Using middleware
 * 
 * ```ts
 * router.use(someEndpoint, withAuth, withAccount, async (req, res) => {
 *   // ...
 * });
 * ```
 * 
 * Note: The [`Express.json()`](http://expressjs.com/en/api.html#express.json) middleware is automatically added to each route.
 */
export function createRouter(expressRouter = PromiseRouter()): Router {
  return {
    routes: () => expressRouter,

    use(endpoint, ...handlers) {
      const validateRequest: Express.RequestHandler = (req, res, next) => {
        // Skip validation if this endpoint does not have a request schema
        // (E.g. it's method is GET/HEAD, or the user didn't provide one)
        if ("request" in endpoint && endpoint.request != null) {
          const result = endpoint.request.safeParse(req.body);

          /**
           * If the schema check fails then respond with an error that the
           * client can recognise as a validation error.
           */
          if (result.success === false) {
            return res.status(400).json({
              errors: result.error.issues,
            });
          }

          /**
           * Replace the body with the parser results, to strip unrecognized
           * properties etc.
           */
          req.body = result.data;
        }

        return next();
      };

      /**
       * Create the route with the the following middleware:
       * - `Express.json()`  to parse/serialize JSON
       * - `validateRequest` to ensure that the request body is correct
       * - `...handlers` custom handlers passed by the user.
       */
      expressRouter[endpoint.method](
        endpoint.path.pattern,
        Express.json(),
        validateRequest,
        ...handlers
      );
    },
  };
}
