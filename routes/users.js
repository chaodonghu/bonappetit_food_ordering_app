"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

  function checkUser(email, password) {
  for(let user in users) {
    if(users[user].email === email  && bcrypt.compareSync(password, users[user].password)){
      return user;
    }
  }
  return "";
}


  function checkRest(email, password) {
  for(let res in restaurants) {
    if(restaurants[res].email === email  && bcrypt.compareSync(password, restaurants[res].password)){
      return res;
    }
  }
  return "";
}

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .then((results) => {
        res.json(results);
    });
  });


  router.get('/users/:id', (req, res) => {
    knex
      .select('*')
      .from('restaurants')
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/menu/:id', (req, res) => {
    knex
      .select('*')
      .from('resta_menu')
      .then((results) => {
        res.join(results);
      });

  });

  router.get('/users/:id/active', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((results) => {
        res.join(results);

      });
  })

  router.get('/restaurants', (req, res) => {
    console.log('hello');
    res.sendStatus(200)

  });

  router.get('/restaurants/:id/active', (req, res) => {
    knex
      .select('*')
      .from('orders')
      .then((results) => {
        res.join(results);
      });
  });

router.post('/login', (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  //res.cookie('user_id', userId)
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);  // Bad Request
  } else {
      let userId = checkUser(email, pass);
      if(userId) {
        req.session.user_id = userId;
        res.redirect("/users/:id")
      } else {
          res.sendStatus(400);
        }
    }
  });

router.post('restaurants/login', (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  //res.cookie('user_id', userId)
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);  // Bad Request
  } else {
      let restId = checkRest(email, pass);
      if(restId) {
        req.session.restaurants_id = restId;
        res.redirect("/restaurants/:id/active")
      } else {
          res.sendStatus(400);
        }
    }
  });



  return router;

}
