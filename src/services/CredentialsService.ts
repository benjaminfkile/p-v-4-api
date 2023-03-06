const as = require("../services/AuthService")

const credService = {
    async checkCredentials(token: TokenTypes) {

        try {
            const decodedToken = as.decodeToken(token)
            return { authenticated: true, decodedToken: decodedToken }
        } catch (err) {
            return { authenticated: false, err: err }
        }
    }
}

module.exports = credService