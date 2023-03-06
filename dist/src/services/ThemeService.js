"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    getThemes(knex) {
        return knex.from("themes")
            .select("*")
            .then((rows) => {
            return rows;
        });
    },
    getTheme(knex, id) {
        return knex.from("themes")
            .select("*")
            .where({ id: id })
            .then((rows) => {
            return rows[0];
        });
    },
    getCurrentTheme(knex) {
        return knex.from("themes")
            .select("*")
            .where({ active: true })
            .then((rows) => {
            return rows[0];
        });
    },
    setTheme(knex, id) {
        const raw = `
        UPDATE themes
        SET active = FALSE;
        UPDATE themes
        SET active = TRUE
        WHERE id = ${id};`;
        return knex.raw(raw);
    },
    updateTheme(knex, theme) {
        return knex.from("themes")
            .update(Object.assign({}, theme));
    }
};
module.exports = service;
