import { Strapi } from "@strapi/strapi";

const filterAsync = async function filter(arr, callback) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail))
    )
  ).filter((i) => i !== fail);
};

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi.plugin("film-scraper").service("scraper").scrape();
  },
  async save(ctx) {
    const filterData = await filterAsync(ctx.request.body, async (el) => {
      const article = await strapi.db
        .query("plugin::film-scraper.schedule")
        .findOne({ where: { title: el.title } });
      return !article;
    });
    ctx.body = await strapi
      .plugin("film-scraper")
      .service("scraper")
      .save(filterData);
  },
  async delete(ctx) {
    ctx.body = await strapi
      .plugin("film-scraper")
      .service("scraper")
      .delete();
  }
});
