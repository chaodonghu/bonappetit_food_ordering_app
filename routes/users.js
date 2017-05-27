'use strict';

const express = require('express');
const router = express.Router();
const sms = require('../twilioClient')

const createOrder = (cart) => {
  const order = []
  cart.foods.forEach((food) => {
    order.push({
      item_id: food.item_id,
      quantity: food.quantity
    });
  })
  return order;
}

// Calculates total cost of each order
const calculateTotal = (cart) => {
  let total = 0;
  cart.foods.forEach((food) => {
    total += (food.price * food.quantity)
  })
  // Adds tax to total. The total will not be rounded before database insertion (eg. 79.99999999999999999)
  return total * 1.13;
}

// // Function to create message from order. String inserts the item name and quantity,
// // pluralizes the name if the quantity is greater than 1. Seperates items with commas and replaces
// // the last commas with 'and'
// const createOrderMessage = (order) => {
//   const messageArray = []
//   order.forEach((item) => {
//     if (item.quantity > 1) {
//       messageArray.push(`${item.quantity} ${item.name}s`)
//     } else {
//       messageArray.push(`${item.quantity} ${item.name}`)
//     }
//   })
//   return messageArray.join(', ').replace(/,(?=[^,]*$)/, ' and')
// }

module.exports = (knex) => {
  // All routes get prepended with /users
  router.get('/menu', (req, res) => {
    knex
      .select()
      .from('foods')
      .then((foods) => {
        let user = req.session.username || ''

        res.render('menu', {
          user,
          foods
        });
      })
      .catch(() => {
        res.status(500).send();
      });
  });

  // Post request on order submission. Knex db insertion into orders table and
  // products_menu table.
  router.post('/order', (req, res) => {
    // Checks for userID in cookie/session if user validation can be implemented
    // const userID        = req.session.user_id
    const userID = 4; // this is Dong's userID *DO NOT CHANGE FOR TESTING*
    console.log(req.body.cart);
    const cart = JSON.parse(req.body.cart)
    const total = calculateTotal(cart)
    const orderItems = createOrder(cart)
    // const message       = createOrderMessage(cart.foods)
    let order_id;

    // "foods":[
    // {"item_id":8,
    // "name":"Smashed Traditional",
    // "price":6.99,
    // "image_url":"http://smokespoutinerie.com/wp-content/uploads/2016/04/SmashedTrad-1.png",
    // "quantity":1}]}

    // Inserts data into orders table and returns the order_id
    knex('orders')
      .returning('id')
      .insert([{
        user_id: userID,
        total_price: total
      }])
      .then((order_id) => {
        console.log(order_id)
        return order_id
      })
      .then(order_id => {
        console.log(`Successfull order submission! The order_id is: ${order_id}`);
        return order_id
      })
      .then((order_id) => {
        orderItems.map((orderItems) => {
          orderItems['order_id'] = Number(order_id)
        })
        orderItems.forEach(item => {
          knex('food_orders')
            .insert(item).then(console.log)
        })
        return order_id
      })
      .then((order_id) => {
        res.json({url: `order/${order_id}`})
        // res.redirect('/users/order/' + order_id);
      })
      .catch((err, result) => {
        if (err) {
          return console.log(`Error: ${err}`);
        } else {
          console.log(result);
          console.log(`Successfull order submission! The order_id is: ${order_id}`);
        }
      });
  });

  // Render cart when user clicks on cart icon
  router.get('/cart', (req, res) => {
    let user = req.session.username || ''
    res.render('cart', {
      user
    });
  })



  // Render a specific order
  router.get('/order/:orderID', (req, res) => {
    const orderID = req.params.orderID
    console.log('GET ORDER', orderID)
    return knex.from('food_orders')
      .innerJoin('orders', 'food_orders.order_id', 'orders.id')
      .innerJoin('foods', 'food_orders.item_id', 'foods.id')
      .select()
      .where('order_id', '=', orderID)
      .then((allFoods) => {
        const locals = {
          foods: allFoods,
          orderID: orderID
        };
          console.log(allFoods)
          if (locals.foods.length === 0) {
            res.redirect('/users/menu');
          } else {
            sms.sendSms(JSON.stringify(allFoods))
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
