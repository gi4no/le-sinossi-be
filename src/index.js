"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          article(slug: String!): ArticleEntityResponse
        }
      `,
      resolvers: {
        Query: {
          article: {
            resolve: async (_parent, args) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.db
                .query("api::article.article")
                .findOne({
                  where: { slug: args.slug },
                });

              return toEntityResponse(data);
            },
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
