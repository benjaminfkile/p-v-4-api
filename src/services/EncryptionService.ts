const bcrypt = require("bcrypt")
const saltRounds = 10

const encriptionService = {
    async generateHash(secret: string) {
        return bcrypt.hashSync(secret, saltRounds)
    },
    async compareHash(secret: string, hash: string) {
        return bcrypt.compare(secret, hash)
    }
}

module.exports = encriptionService