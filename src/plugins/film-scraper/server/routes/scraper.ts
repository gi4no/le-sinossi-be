export default {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/scraper",
      handler: "scraper.index",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/scraper/save",
      handler: "scraper.save",
      config: {
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/scraper/delete",
      handler: "scraper.delete",
      config: {
        policies: [],
      },
    },
  ],
};
