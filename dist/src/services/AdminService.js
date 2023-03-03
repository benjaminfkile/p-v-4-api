"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminService = {
    getAdmins(knex) {
        return knex.from("admins")
            .select("*")
            .then((rows) => {
            return rows;
        });
    },
    getAdminByEmail(knex, email) {
        return knex.from("admins")
            .select("*")
            .where({ email: email })
            .then((rows) => {
            return rows[0];
        });
    },
    getAdmin(knex, id) {
        return knex.from("admins")
            .select("*")
            .where({ id: id })
            .then((rows) => {
            return rows[0];
        });
    },
    insertAdmin(knex, admin, hash) {
        const { fName, lName, email } = admin;
        const raw = `INSERT INTO admins(f_name, l_name, email, hash, created) VALUES('${fName}', '${lName}', '${email}', '${hash}', NOW())`;
        return knex.raw(raw);
    }
};
module.exports = adminService;
