"use strict";
const aboutService = require("./AboutService");
const socketService = {
    intit: (io, db) => {
        io.on("connection", (socket) => {
            console.log("a user connected");
            socket.on("send-about-JSON", () => {
                aboutService.getAbout(db).then((about) => {
                    io.emit("recieve-about-JSON", about);
                });
            });
        });
    }
};
module.exports = socketService; //bump
