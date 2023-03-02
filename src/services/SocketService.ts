const aboutService = require("./AboutService")
const themeService = require("./ThemeService")

const socketService = {
    intit: (io: any, db: any) => {
        io.on("connection", (socket: any) => {
            const id = socket.conn.id
            //???----------------------------------------not protected------------------------------------------
            //about
            socket.on("send-about", () => {
                aboutService.getAbout(db).then((about: AboutTypes[]) => {
                    io.to(id).emit("receive-about", about)
                })
            })
            //all themes
            socket.on("send-themes", () => {
                themeService.getThemes(db).then((themes: any[]) => {
                    io.to(id).emit("receive-themes", themes)
                })
            })
            //current theme
            socket.on("send-current-theme", () => {
                themeService.getCurrentTheme(db).then((theme: any) => {
                    io.to(id).emit("receive-current-theme", theme)
                })
            })
            //???------------------------------------------protected--------------------------------------------
            //current theme
            socket.on("set-theme", (id: any) => {
                themeService.getTheme(db, id.id).then((theme: any) => {
                    if (theme) {
                        themeService.setTheme(db, id.id)
                        .then(() => {
                            themeService.getCurrentTheme(db).then((theme: any) => {
                                io.emit("receive-current-theme", theme)
                            })

                        })
                    }else{
                        console.log("not found")
                    }
                })
            })
        })
    }
}

module.exports = socketService