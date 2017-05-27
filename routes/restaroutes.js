'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  // all routes are prepended with /restaurants

  // get /order_status will render the order status page for the restaurants
  // checking on new orders
  // localhost:8080/restaurants/order_status
  router.post('/order_status/:id', (req, res) => {
    const orderid = req.params.id;
    const time = req.body.time;

    console.log(req.body)
    return knex('orders')
    .where('orders.id', '=', orderid)
    .update({time: time})
    .then(function() {
      const sms = {};
      return knex('orders')
      .innerJoin('users', 'orders.user_id', 'users.id')
      .select()
      .where('orders.id', '=', orderid)
      .then(function(result) {
        sms.user = result;
      })
    })
    .then(function() {
      res.redirect('/restaurants/order_status');
    });
  });
  router.get('/order_status', (req, res) => {
    const locals = {};
    return knex('orders')
      .join('users', 'orders.user_id', 'users.id')
      .select()
      .then(function(userOrders) {
        return knex('food_orders')
          .innerJoin('orders', 'food_orders.order_id', 'orders.id')
          .innerJoin('foods', 'food_orders.item_id', 'foods.id')
          .select()
          .then(function(foodOrders) {
            res.render('orders_status', {userOrders: userOrders, foodOrders: foodOrders });
          });
    });
  });


router.post('/done/:id', (req, res) => {

    const orderid = req.params.id;
    const done = true;
    const notDone = false;

    console.log(orderid);

    return knex('orders')
        .where('orders.id', '=', orderid)
        .update({complete: true})
        .then(function() {
          const sms = {};
          return knex('orders')
          .innerJoin('users', 'orders.user_id', 'users.id')
          .select('users.first_name')
          .where('orders.id', '=', orderid)
          .then(function(result) {
            sms.user = result;
            console.log('sms.user', result);
          }).then(function() {
            res.redirect('/restaurants/order_status');
          });
      });
  });

  // For now just renders json
  // Should render restaurant login file
  router.get('/', (req, res) => {
    res.status(200).render('restaurants')
  });

  // // Render active orders for logged-in restaurant owner
  // router.get('/:id/orders', (req, res) => {
  //   knex
  //     .select('*')
  //     .from('restaurant')
  //     .then((results) => {
  //       res.render('orders_status.ejs', {results});
  //     });
  // });


  // Login request
  // TODO: Connect to DB for password checking
  router.post('/login', (req, res) => {
    let restaname = req.body.restaname;
    let password = req.body.password;

    if (!restaname) return res.sendStatus(403);
    if (!password) return res.sendStatus(403);

    knex('restaurant')
    .where({
      restaname,
      password
    })
    .select()
    .then((restaData) => {
      if (restaData.length === 0) return res.sendStatus(404)
      req.session.restaname = restaData[0].restaname
      res.status(200).send(restaData)
    })
    .catch(err => {
      console.log('something happend', err)
      res.sendStatus(500)
    })
  });

  // Logout request
  router.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200)
  });

  return router;
}
