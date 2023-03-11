"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = __importDefault(require("./scraper"));
const schedule_1 = __importDefault(require("./schedule"));
exports.default = {
    scraper: scraper_1.default,
    schedule: schedule_1.default,
};
