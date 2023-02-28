import { rest } from "msw";

export const handlers = [
  rest.post("https://amplitude.nav.no/collect", async (req, res, ctx) => {
    await ctx.fetch(req);
    return res(ctx.status(200));
  }),

  rest.get("/forebygge-fravar/kursoversikt", async (req, res, ctx) => {
    await ctx.fetch(req);
    return res(ctx.status(200), ctx.json([]));
  }),

    rest.get("forebygge-fravar/:slug*", async (req, res, ctx) => {
    req.passthrough();
  }),
];
