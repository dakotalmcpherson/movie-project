const mongoose = require('mongoose');
const models = require('../models/models')

const databaseMiddleware = {};

databaseMiddleware.loginOrSignUp = (req, res, next) => {
  const { gitInfo } = res.locals;
  const username = gitInfo.login;

  models.User.findOne({username})
    .then((user) => {
      if (!user) {
        const newUser = new models.User({
          username
        })
        newUser.save()
          .then((createdUser) => {
            if (!createdUser) {
              return next ({
                message: 'error saving user to database',
                error: 'error'
              })
            }
            res.locals.user = createdUser;
            return next();
          })
      }
      res.locals.user = user;
      return next();
    })
}

databaseMiddleware.getUser = (req, res, next) => {
  const { id } = res.locals;
  models.User.findById(id)
    .then((user) => {
      res.locals.user = user;
      return next()
    })
}

databaseMiddleware.addMovie = (req, res, next) => {
  const movie = req.body;
  const cookieId = req.cookies.SSID;
  models.User.findByIdAndUpdate(cookieId, {$push: {movieList: movie}}, {new: true})
    .then(result => {
      res.locals.updatedUser = result;
      return next();
    })
}

databaseMiddleware.deleteMovie = (req, res, next) => {
  const movie = req.body;
  const cookieId = req.cookies.SSID;
  models.User.findByIdAndUpdate(cookieId, {$pull: {movieList: { id: movie.id }}})
    .then((result) => {
      res.locals.updatedUser = result;
      return next()
    })
}

module.exports = databaseMiddleware;