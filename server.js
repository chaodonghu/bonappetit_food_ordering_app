'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;

const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session')
const sass = require('node-sass-middleware');

const app = express();

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const restaroutes = require('./routes/restaroutes');
const usersRoutes = require('./routes/users');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');

// Dong -  Cookie session settings to keep track of the userID
// Vik - I've replaced express session with cookie-session.
// It is a bit easier to use and IMO a bit more suitable for our case

app.use(session({
  name: 'session',
  keys: ['andrew_thomas_par_supa_secret', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes

app.use('/users', usersRoutes(knex));
app.use('/restaurants', restaroutes(knex));


// ^^^^^^^^^ INITIAL SETUP - DO NOT MODIFY ANYTHING ABOVE THIS LINE ^^^^^^^^^^

// Home page

app.get('/', (req, res) => {
  let user
  console.log(req.session)
  if (req.session.username) user = req.session.username;
  res.status(200).render('index.ejs', {user})
});

// Login
// TODO: connect to DB for password checking
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username) return res.sendStatus(403);
  if (!password) return res.sendStatus(403);

  knex('users')
  .where({
    username,
    password
  })
  .select()
  .then((userData) => {
    if (userData.length === 0) return res.sendStatus(404)
    req.session.username = userData[0].username
    res.status(200).send(userData)
  })
  .catch(err => {
    console.log('something happend', err)
    res.sendStatus(500)
  })

});

// Logout
app.post('/logout', (req, res) => {
  req.session = null;
  res.sendStatus(200);
});


app.listen(PORT, () => {
  console.log('Example app listening on port' + PORT);
});
