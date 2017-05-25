'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // For now just renders json
  // Should render restaurant login file
  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('restaurant')
      .then((results) => {
        res.json(results);
      });
  });

  // Render active orders for logged-in restaurant owner
  router.get('/:id/orders', (req, res) => {
    knex
      .select('*')
      .from('restaurant')
      .then((results) => {
        res.json(results);
      });
  });

  // Handle request for order completion
  router.post('/:id/complete', (req, res) => {
    res.send('Order completed, restaurant ' + req.params.id);
  });

  // Login request
  // TODO: Connect to DB for password checking
  router.post('/login', (req, res) => {
    if (!req.body.rest_id) return res.sendStatus(403)
    req.session.rest_id = req.body.rest_id
    res.sendStatus(202)
  });

  // Logout request
  router.post('/logout', (req, res) => {
    res.sendStatus(202)
  });

  return router;
}
