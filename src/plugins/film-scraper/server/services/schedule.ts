import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findMany() {
    const scheduleEntities = await strapi.db
      .query("plugin::film-scraper.schedule")
      .findMany({});

    return scheduleEntities;
  },
});
