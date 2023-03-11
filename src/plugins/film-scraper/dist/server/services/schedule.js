"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async findMany() {
        const scheduleEntities = await strapi.db
            .query("plugin::film-scraper.schedule")
            .findMany({});
        return scheduleEntities;
    },
});
