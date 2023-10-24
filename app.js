const express = require("express")
const app = express()
const routes = require("./routes")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

app.get("/", (req, res) => {
  res.send("Hello welcome to my Photo Album Api")
})

module.exports = app
