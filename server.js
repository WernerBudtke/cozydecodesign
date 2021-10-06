const express = require("express")
const cors = require("cors")
require("dotenv").config()
const session = require("express-session")
const mongo = require("connect-mongodb-session")(session)
const router = require("./routes/index")
const store = new mongo({
  uri: process.env.MONGODB,
  collection: "sessions",
})
require("./config/database")
require("./config/passport")
const path = require("path")
const app = express()
const fileUpload = require('express-fileupload')
app.use(cors({
  origin: "https://cozydecodesign.herokuapp.com/",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
}))
app.use(express.json())
app.use(express.static('storage'))
app.use(fileUpload())
app.use(session({
    secret: process.env.SECRETORKEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: false,
      secure: false,
      httpOnly: true,
    }
  })
)
app.use("/api", router)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  })
}

const PORT = process.env.PORT || 4000
const HOST = process.env.MYHOST || "0.0.0.0"
const server = app.listen(PORT, HOST, () =>
  console.log(`Server listening on ${PORT} at ${HOST}!`)
)
