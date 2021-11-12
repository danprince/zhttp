import Express from "express";
import { Params } from "static-path";
import { Endpoint, HttpMethod } from "./endpoint";
import PromiseRouter from "express-promise-router";

export type Middleware<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<infer Pattern, any, infer Request, infer Response>
    ? Express.RequestHandler<Params<Pattern>, Response, Request> : never;

export function createRouter(router = PromiseRouter()) {
  const use = <
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
  ) => {
    const validate: Express.RequestHandler = (req, res, next) => {
      const result = endpoint.request.safeParse(req.body);

      if (result.success === false) {
        return res.status(400).json({
          errors: result.error.issues,
        });
      }

      req.body = result.data;
      return next();
    };

    router[endpoint.method](
      endpoint.path.pattern,
      Express.json(),
      validate,
      ...handlers
    );
  };

  return {
    use,
    routes: () => router,
  };
}
