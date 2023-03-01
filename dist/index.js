"use strict";
require("dotenv").config();
const knex = require("knex");
const PORT = process.env.PORT;
const app = require("./src/app");
const server = require("http").createServer({}, app);
const io = require("socket.io").listen(server);
const ss = require("./src/services/SockeService");
const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL ? false : true
    }
});
app.set("db", db);
ss.intit(io, db);
server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});