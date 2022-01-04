const express = require("express")
const app = express()
const passport = require("../config/passport")
const fs = require("fs")

let path = require("../users.json")

// "passport.authenticate("local")" = middleware de la stratégie locale 
app.post('/login', passport.authenticate("local"), (req, res) => {
    
    // req.logIn va login le user sur le serveur
    if (req.user) {
        req.logIn(req.user, (err) => {
        if (err) {
          res.status(500).send("An error occured")
        }

        // renvoyer le user
        res.json(req.user)
      })
    }
})

app.post('/signup', (req, res) => {
  const user = {
    id: path.length + 1, 
    ...req.body 
  }
  // users = [ ...users, user ]
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error", err)
      res.status(500).send("Internal server error")
    }
    let users = JSON.parse(data)
    users = [ ...users, user ]

    fs.writeFile(path, JSON.stringify(users), (err) => {
      if (err) {
        res.status(500).send("Internal server error")
      }
    })
  })

  res.json(user)
})

module.exports = app