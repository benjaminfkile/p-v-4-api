"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getAbout(knex) {
        return knex.from("about")
            .select("*")
            .then((rows) => {
            return rows;
        });
    }
};
module.exports = service;
