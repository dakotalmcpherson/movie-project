const cookieMiddleware = {}

cookieMiddleware.createCookie = (req, res, next) => {
  const id = res.locals.user._id.toHexString()
  res.cookie('SSID', id, {httpOnly: true})
  res.locals.cookieId = id;
  return next()
}

module.exports = cookieMiddleware;