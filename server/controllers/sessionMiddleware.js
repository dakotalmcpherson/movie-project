const models = require('../models/models')

const sessionMiddleware = {};

sessionMiddleware.createSession = (req, res, next) => {
  const { cookieId } = res.locals;

  const newSession = new models.Session({
    cookieId,
  })

  models.Session.findById(cookieId)
    .then((session) => {
      if (!session) {
        newSession.save()
          .then((session) => {
          return next();
    })
      }
      return next()
    })

  
}

sessionMiddleware.checkSession = (req, res, next) => {
  const cookieId = req.cookies.SSID
  if (!cookieId) {
    res.end()
  } else {
    models.Session.findOne({cookieId})
      .then((session) => {
        console.log(session)
        if (session) {
          res.locals.id = cookieId;
          return next()
        } else {
          return res.end()
        }
      })
  }
}

module.exports = sessionMiddleware