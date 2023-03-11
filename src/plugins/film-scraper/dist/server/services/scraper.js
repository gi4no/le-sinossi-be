"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
exports.default = ({ strapi }) => ({
    async scrape() {
        const resp = await axios_1.default.get("https://www.mymovies.it/cinema/milano/");
        const dom = new jsdom_1.JSDOM(resp.data);
        const result = Array.from(dom.window.document.querySelectorAll(".mm-col.sm-7.md-6.lg-6 .poster-schedina-div")).map((el) => ({
            image: el.querySelector("amp-img").getAttribute("src"),
            title: el.parentElement.querySelector(`#${el.id} ~ .mm-white.mm-padding-8 .schedine-titolo a`).textContent,
            description: el.parentElement.querySelector(`#${el.id} ~ .mm-white.mm-padding-8 .schedine-lancio`).textContent,
            trama: el.parentElement.querySelector(`#${el.id} ~ .mm-white.mm-padding-8 [id*="trama"]`).textContent,
            publishedAt: new Date(),
        }));
        return {
            result,
        };
    },
    async save(data) {
        if (data.length === 0) {
            return { status: "ok" };
        }
        await strapi.db.query("plugin::film-scraper.schedule").createMany({ data });
        return { status: "ok" };
    },
    async delete() {
        await strapi.db
            .query("plugin::film-scraper.schedule")
            .deleteMany({ where: { createdAt: { $lte: new Date() } } });
        return { status: "ok" };
    },
});
