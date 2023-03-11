"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_controller_1 = __importDefault(require("./my-controller"));
const scraper_1 = __importDefault(require("./scraper"));
const schedule_1 = __importDefault(require("./schedule"));
exports.default = {
    myController: my_controller_1.default,
    scraper: scraper_1.default,
    schedule: schedule_1.default,
};
