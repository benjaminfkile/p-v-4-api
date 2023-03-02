
import { Knex } from "knex"

const themeService = {
    getThemes(knex: Knex) {
        return knex.from("themes")
            .select("*")
            .then((rows: any[]) => {
                return rows
            })
    },
    getTheme(knex: Knex, id: number) {
        return knex.from("themes")
            .select("*")
            .where({ id: id })
            .then((rows: any[]) => {
                return rows[0]
            })
    },
    getCurrentTheme(knex: Knex) {
        return knex.from("themes")
            .select("*")
            .where({ active: true })
            .then((rows: any[]) => {
                return rows[0]
            })
    },
    setTheme(knex: Knex, id: number) {
        const raw = `
        UPDATE themes
        SET active = FALSE;
        UPDATE themes
        SET active = TRUE
        WHERE id = ${id};`
        return knex.raw(raw)
    },
    updateTheme(knex: Knex, theme: any) {
        return knex.from("themes")
        .update({...theme})
    }
}

module.exports = themeService