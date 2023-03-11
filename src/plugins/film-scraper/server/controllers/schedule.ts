import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findMany(ctx) {
    ctx.body = await strapi.plugin("film-scraper").service("schedule").findMany();
  },
});
