"use strict";
const socketService = {
    intit: (io) => {
        io.on("connection", (socket) => {
            console.log("user connected");
            socket.emit("send-pf-json", { key: "val" });
        });
    }
};
module.exports = socketService;
