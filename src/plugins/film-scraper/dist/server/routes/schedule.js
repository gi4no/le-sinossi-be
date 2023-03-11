"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "content-api",
    routes: [
        {
            method: "GET",
            path: "/",
            handler: "myController.index",
            config: {
                policies: [],
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/schedules",
            handler: "schedule.findMany",
            config: {
                policies: [],
                auth: false,
            },
        },
    ],
};
