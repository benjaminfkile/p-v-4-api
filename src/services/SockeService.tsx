const aboutService = require("./AboutService")

const socketService = {
    intit: (io: any, db: any) => {
        io.on("connection", (socket: any) => {
            socket.on("send-about-JSON", () => {
                aboutService.getAbout(db).then((about: AboutTypes) => {
                    io.emit("recieve-about-JSON", about)
                })
            })
        })
    }
}

module.exports = socketService//bump