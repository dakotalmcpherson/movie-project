const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const bp = require('body-parser')

const authMiddleware = require('./controllers/authMiddleware')
const databaseMiddleware = require('./controllers/databaseMiddleware')
const cookieMiddleware = require('./controllers/cookieMiddleware')
const sessionMiddleware = require('./controllers/sessionMiddleware')

const clientId = '2b4b7ec31ec4e9abac1b'

app.use(cookieParser())
app.use(bp.json())

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.get('/login', (req, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
})

app.get('/oauth', 
  authMiddleware.login, 
  databaseMiddleware.loginOrSignUp, 
  cookieMiddleware.createCookie, 
  sessionMiddleware.createSession,
  (req, res) => {
  res.redirect('http://localhost:8080')
})

app.get('/checklogin', 
  sessionMiddleware.checkSession, 
  databaseMiddleware.getUser, 
  (req, res) => {
  if (res.locals.user) {
    res.status(200).send(res.locals.user)
  } else {
    res.status(404)
  }
})

app.post('/addmovie', 
  databaseMiddleware.addMovie,
  (req, res) => {
    res.status(200).send(res.locals.updatedUser)
})

app.delete('/deletemovie',
  databaseMiddleware.deleteMovie,
  (req, res) => {
    res.status(200).send(res.locals.updatedUser)
  }
)

app.listen(3000, () => {
  console.log('listening on port 3000')
})