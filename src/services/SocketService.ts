const aboutService = require("./AboutService")
const themeService = require("./ThemeService")
const adminService = require("./AdminService")
const authService = require("./AuthService")
const encryptionService = require("./EncryptionService")
const credentialsService = require("./CredentialsService")

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
            //!!!!! uncomment this to add an admin
            // socket.on("send-create-admin", (newAdmin: NewAdminTypes) => {
            //     console.log(newAdmin)
            //     encryptionService.generateHash(newAdmin.secret).then((hash: string) => {
            //         adminService.insertAdmin(db, newAdmin, hash).then((newAdmin: AdminTypes) => {
            //             console.log(newAdmin)
            //         })
            //     })
            // })
            //current theme
            socket.on("set-theme", (args: { token: string, id: number }) => {
                credentialsService.checkCredentials(args.token).then((result: CheckCredentialsReturnTypes) => {
                    if(result.authenticated){
                        themeService.getTheme(db, args.id).then((theme: any) => {
                            if (theme) {
                                themeService.setTheme(db, args.id)
                                    .then(() => {
                                        themeService.getCurrentTheme(db).then((theme: any) => {
                                            io.emit("update-current-theme", theme)
                                        })
    
                                    })
                            }
                        })
                    }else{
                        io.to(id).emit("emit-auth-status", "forbidde")
                    }
                })
            })
        })
    }
}

module.exports = socketService