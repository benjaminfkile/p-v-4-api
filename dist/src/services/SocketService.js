"use strict";
const aboutService = require("./AboutService");
const themeService = require("./ThemeService");
const socketService = {
    intit: (io, db) => {
        io.on("connection", (socket) => {
            const id = socket.conn.id;
            //???----------------------------------------not protected------------------------------------------
            //about
            socket.on("send-about", () => {
                aboutService.getAbout(db).then((about) => {
                    io.to(id).emit("receive-about", about);
                });
            });
            //all themes
            socket.on("send-themes", () => {
                themeService.getThemes(db).then((themes) => {
                    io.to(id).emit("receive-themes", themes);
                });
            });
            //current theme
            socket.on("send-current-theme", () => {
                themeService.getCurrentTheme(db).then((theme) => {
                    io.to(id).emit("receive-current-theme", theme);
                });
            });
            //???------------------------------------------protected--------------------------------------------
            //current theme
            socket.on("set-theme", (id) => {
                themeService.getTheme(db, id.id).then((theme) => {
                    if (theme) {
                        themeService.setTheme(db, id.id)
                            .then(() => {
                            themeService.getCurrentTheme(db).then((theme) => {
                                io.emit("receive-current-theme", theme);
                            });
                        });
                    }
                    else {
                        console.log("not found");
                    }
                });
            });
        });
    }
};
module.exports = socketService;
