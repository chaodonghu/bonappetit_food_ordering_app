exports.seed = function(knex, Promise) {
  //get the id in restaurant table
  function getId() {
    return knex('restaurant')
      .select('id')
      .where('name', 'like', 'S%');
  }

  function getUId(char) {
    return knex('users')
      .select('id')
      .where('first_name', '=', char);
  }

  function getOId(price) {
    return knex('orders')
      .select('id')
      .where('total_price', '=', price);
  }

  function getPId(name) {
    return knex('foods')
      .select('id')
      .where('name', '=', name);
  }

  // Deletes ALL existing entries
  return knex('food_orders').del()
  .then(function() {
    return knex('foods').del()
  }).then(function() {
      return knex('orders').del()
  }).then(function() {
      return knex('restaurant').del()
  }).then(function() {
      return knex('users').del()
    //seed the restaurant table
  }).then(function() {
      return knex('restaurant').insert({
        name: 'Smoke\'s Poutinerie',
        restaname: 'smokies',
        password: 'pass'
      });
    //seed products table
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Traditional',
        description: 'Smoke\'s Signature Gravy & Quebec Cheese Curd.',
        price: 6.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2016/04/traditional-line.png'
      });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Smashed Traditional',
        description: 'Smoke\'s Signature Gravy, Quebec Cheese Curd',
        price: 6.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2016/04/SmashedTrad-1.png'
      });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Veggie Traditional',
        description: 'Smoke\'s Veggie Gravy, Quebec Cheese Curd',
        price: 6.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2016/04/traditional-line.png'
      });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Hangover Poutine',
        description: 'Mans had a rough night eh?.',
        price: 7.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2017/03/Hangover.jpg'
      });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Bacon, Beans & Weenies',
        description: 'Contains Pork',
        price: 7.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2017/03/BaconBeansWeenies.jpg'
      });
  }).then(function() {
      return knex('foods').insert({
        restaurant_id: getId(),
        name: 'Chilli Cheese Bacon Poutine',
        description: 'Chill fam.',
        price: 7.99,
        image_url: 'http://smokespoutinerie.com/wp-content/uploads/2016/04/CCB2-copy.jpg'
      });
      //seed users table
  }).then(function() {
      return knex('users').insert({
        first_name: 'Dong',
        last_name: 'Hu',
        phone: '14162770776',
        username: 'dong',
        email: '',
        password: 'password'
      });
  }).then(function() {
      return knex('users').insert({
        first_name: 'Viktor',
        last_name: 'M',
        phone: '15555555555',
        username: 'viktmv',
        email: 'viktmv@icloud.com',
        password: 'password'
      });
  }).then(function() {
      return knex('users').insert({
        first_name: 'Karun',
        last_name: 'A',
        phone: '13333333333',
        username: 'karun',
        email: '',
        password: 'password'
      });
      //seed orders table
  });
};
