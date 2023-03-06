
import { Knex } from "knex"

const service = {
    getAbout(knex: Knex) {
        return knex.from("about")
            .select("*")
            .then((rows: AboutTypes[]) => {
                return rows
            })
    }
}

module.exports = service