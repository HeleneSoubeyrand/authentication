const connectedUser = (req, res, next) => {
    if (!req.user) { // si mon user est connecté
      res.status(401).send("Unauthorized")
    } else {
      next()
    }
}
  
module.exports = {
  connectedUser
}