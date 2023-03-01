
import { Knex } from "knex"

const aboutService = {
    getAbout(knex: Knex) {
        return knex.from("about")
            .select("*")
            .then((rows: AboutTypes[]) => {
                return rows
            })
    }
}

module.exports = aboutService