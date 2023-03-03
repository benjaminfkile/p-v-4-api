import express, { Express, NextFunction, Request, Response } from "express"
const NODE_ENV = process.env.NODE_ENV
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const app: Express = express()
const authRouter = require("./routes/AuthRouter")

const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common"

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req: Request, res: Response) => {
  res.send("portfolio api")
})

app.use("/api/auth", authRouter)

app.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  // res.render('error', { error: err })
})

module.exports = app