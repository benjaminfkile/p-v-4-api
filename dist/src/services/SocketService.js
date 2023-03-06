"use strict";
const aboutService = require("./AboutService");
const themeService = require("./ThemeService");
const adminService = require("./AdminService");
const authService = require("./AuthService");
const encryptionService = require("./EncryptionService");
const credentialsService = require("./CredentialsService");
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
            socket.on("send-create-admin", (newAdmin) => {
                console.log(newAdmin);
                encryptionService.generateHash(newAdmin.secret).then((hash) => {
                    adminService.insertAdmin(db, newAdmin, hash).then((newAdmin) => {
                        console.log(newAdmin);
                    });
                });
            });
            //current theme
            socket.on("set-theme", (args) => {
                credentialsService.checkCredentials(args.token).then((result) => {
                    if (result.authenticated) {
                        themeService.getTheme(db, args.id).then((theme) => {
                            if (theme) {
                                themeService.setTheme(db, args.id)
                                    .then(() => {
                                    themeService.getCurrentTheme(db).then((theme) => {
                                        io.emit("update-current-theme", theme);
                                    });
                                });
                            }
                        });
                    }
                    else {
                        io.to(id).emit("emit-auth-status", "forbidde");
                    }
                });
            });
        });
    }
};
module.exports = socketService;
