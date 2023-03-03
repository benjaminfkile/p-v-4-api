import timeMachine from "../utils/TimeMachine"
const jwt = require("jsonwebtoken")

const authService = {
    signToken(payload: { tokenType: string, admin: AdminTypes, created: string }) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: `${timeMachine.secondsTillMidnight()}s` })

    },
    async decodeToken(token: any) {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    }
}

module.exports = authService