// In a shared dir ...

import { z } from "zod";
import { path } from "static-path";
import { endpoint } from "./endpoint";

const updateUser = endpoint({
  method: "post",

  path: path("/users/:id"),

  request: z.object({
    name: z.string(),
  }),

  response: z.object({
    id: z.string(),
    name: z.string(),
  }),
});


// At the server ...

import { createRouter } from "./express";

const router = createRouter();

router.use(updateUser, async (req, res) => {
  res.json({
    id: "dan",
    name: "Dan"
  });
});


// At the client ...

import { createClient } from "./fetch";

let UserApi = createClient({
  updateUser,
}, {
  baseUrl: "/api"
});

async () => {
  let res = await UserApi.updateUser({
    params: { id: "123" },
    body: { name: "dan" },
  })
}

export default router.routes();