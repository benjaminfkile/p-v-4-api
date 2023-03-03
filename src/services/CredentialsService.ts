const as = require("../services/AuthService")

const credentialsService = {
    async checkCredentials(token: TokenTypes) {

        try {
            const decoded = as.decodeToken(token)
            return { authenticated: true, decoded: decoded }
        } catch (err) {
            return { authenticated: false, decoded: {} }
        }
    }
}

module.exports = credentialsService