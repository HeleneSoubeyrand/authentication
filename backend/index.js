const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const session = require("express-session")

const passport = require("./config/passport")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const filesRoutes = require("./routes/files")

app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/files", filesRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})