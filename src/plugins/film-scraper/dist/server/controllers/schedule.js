"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async findMany(ctx) {
        ctx.body = await strapi.plugin("film-scraper").service("schedule").findMany();
    },
});
