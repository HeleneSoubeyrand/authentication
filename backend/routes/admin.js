const express = require("express")
const app = express()
const users =  require("../users.json")
const { verifyUser } = require("../middlewares/admin")

app.get("/", verifyUser, (req, res) => {
    res.json(users)
})

module.exports = app