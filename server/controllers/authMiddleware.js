const client_id = '2b4b7ec31ec4e9abac1b'
const client_secret = 'a9c2b0ce745da18e16c73392e6c2382158ddf773'

const axios = require('axios');

authMiddleware = {}

authMiddleware.login = (req, res, next) => {
  const { code } = req.query
  console.log(code)
  const body = {
    client_id,
    client_secret,
    code
  }

  const opts = { headers: { 
    accept: 'application/json' } };

  axios.post('https://github.com/login/oauth/access_token', body, opts)
    .then((response) => {
      const token = response.data['access_token'];
      console.log('token:', token)
      res.locals.token = token;
      return token
    })
    .then((token) => {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.get('https://api.github.com/user', config)
        .then((response) =>{
          res.locals.gitInfo = response.data;
          return next();
        })
        .catch(err => {
          return next({
            message: 'error occured retrieving user info from github',
            error: err
          })
        })
    })
    .catch(err => {
      return next({
        message: 'error occured in authMiddleware.login',
        error: err
      })
    })

}

module.exports = authMiddleware;