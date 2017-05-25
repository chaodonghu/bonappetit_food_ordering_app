'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/menu', (req, res) => {
    knex
      .select()
      .from('foods')
      .then((foods) => {
        let user = req.session.username || ''

        res.render('menu', {user, foods});
      })
      .catch(() =>{
        res.status(500).send();
      });
  });

  // Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    let user = req.session.username || ''
    res.render('cart', {user});
  })

  router.get('/:orderID', (req, res) => {
    const orderID = Number(req.params.orderID)
    return knex.from('food_orders')
      .innerJoin('orders', 'food_orders.order_id', 'orders.id')
      .innerJoin('products', 'food_orders.item_id', 'foods.id')
      .select(orderID, 'foods.name', 'foods.price', 'food_orders.quantity', 'orders.time')
      .where('order_id', '=', orderID)
      .then((allFoods) => {
        const locals = {
          products: allFoods,
          orderID: orderID
        };
          if (locals.products.length === 0) {
            res.redirect('/user/menu');
          } else {
            res.render('order_confirmation', locals);
          }
      })
      .catch((err) => {
        console.log("Knex query failed", err)
      })
      res.render('order_confirmation', orderConfirm);
  })

  return router;
}
