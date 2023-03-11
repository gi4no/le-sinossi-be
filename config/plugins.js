module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  "film-scraper": {
    enabled: true,
    resolve: "./src/plugins/film-scraper", // path to plugin folder
  },
  ...(process.env.NODE_ENV === "production"
    ? {
        upload: {
          config: {
            provider: "cloudinary",
            providerOptions: {
              cloud_name: env("CLOUDINARY_NAME"),
              api_key: env("CLOUDINARY_KEY"),
              api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
              upload: {},
              delete: {},
            },
          },
        },
      }
    : {}),
  seo: {
    enabled: true,
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 15,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
